"""
ARTISTREE - BabyTrack API Server
FastAPI server for video blob tracking processing
"""
import cv2
import numpy as np
import io
import asyncio
from typing import Optional, List
from fastapi import FastAPI, UploadFile, File, Form, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from processor import BlobTracker, ProcessingSettings

app = FastAPI(
    title="ARTISTREE - BabyTrack API",
    description="Video blob tracking processing server",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Track active connections
active_connections: List[WebSocket] = []


class SettingsRequest(BaseModel):
    """Processing settings from frontend"""
    shape: str = "basic"
    region_style: str = "random"
    connection_rate: float = 0.5
    stroke_width: int = 2
    blob_count: int = 64
    text_position: str = "center"
    font_size: int = 16
    filters: List[str] = []
    min_area: int = 100
    max_blobs: int = 500


def settings_from_dict(data: dict) -> ProcessingSettings:
    """Convert dict to ProcessingSettings"""
    return ProcessingSettings(
        shape=data.get("shape", "basic"),
        region_style=data.get("region_style", "random"),
        connection_rate=data.get("connection_rate", 0.5),
        stroke_width=data.get("stroke_width", 2),
        blob_count=data.get("blob_count", 64),
        text_position=data.get("text_position", "center"),
        font_size=data.get("font_size", 16),
        filters=data.get("filters", []),
        min_area=data.get("min_area", 100),
        max_blobs=data.get("max_blobs", 500)
    )


@app.get("/")
async def root():
    """Health check"""
    return {"status": "ok", "service": "ARTISTREE BabyTrack API"}


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}


@app.post("/api/tools/baby-track/process")
async def process_video(
    file: UploadFile = File(...),
    shape: str = Form("basic"),
    region_style: str = Form("random"),
    connection_rate: float = Form(0.5),
    stroke_width: int = Form(2),
    blob_count: int = Form(64),
    text_position: str = Form("center"),
    font_size: int = Form(16),
    filters: str = Form(""),
    min_area: int = Form(100),
    max_blobs: int = Form(500)
):
    """
    Process video file and return processed video
    """
    # Parse filters
    filter_list = filters.split(",") if filters else []

    settings = ProcessingSettings(
        shape=shape,
        region_style=region_style,
        connection_rate=connection_rate,
        stroke_width=stroke_width,
        blob_count=blob_count,
        text_position=text_position,
        font_size=font_size,
        filters=filter_list,
        min_area=min_area,
        max_blobs=max_blobs
    )

    # Read video - save to temp file for VideoCapture
    contents = await file.read()
    import tempfile
    import os

    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as tmp:
        tmp.write(contents)
        tmp_path = tmp.name

    video = cv2.VideoCapture(tmp_path)

    if not video.isOpened():
        os.unlink(tmp_path)
        return {"error": "Failed to open video"}

    # Get video properties
    fps = int(video.get(cv2.CAP_PROP_FPS))
    width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total_frames = int(video.get(cv2.CAP_PROP_FRAME_COUNT))

    # Create tracker
    tracker = BlobTracker()

    # Create output buffer
    output_buffer = io.BytesIO()

    # Video writer - use mp4v codec which is widely supported
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    output_writer = cv2.VideoWriter('output.mp4', fourcc, fps, (width, height))

    if not output_writer.isOpened():
        output_writer.release()
        return {"error": "Failed to initialize video writer. No suitable codec available."}

    frame_count = 0
    while True:
        ret, frame = video.read()
        if not ret:
            break

        # Process frame
        processed_frame = tracker.process_frame(frame, settings)
        output_writer.write(processed_frame)

        frame_count += 1
        print(f"Processed frame {frame_count}/{total_frames}", end="\r")

    video.release()
    output_writer.release()
    os.unlink(tmp_path)

    # Convert to browser-compatible format using ffmpeg
    import subprocess
    subprocess.run([
        'ffmpeg', '-y', '-i', 'output.mp4',
        '-c:v', 'libx264', '-preset', 'fast',
        '-crf', '23', '-movflags', '+faststart',
        'output_compatible.mp4'
    ], capture_output=True)

    # Return output file
    with open('output_compatible.mp4', 'rb') as f:
        output_data = f.read()

    # Cleanup temp files
    os.unlink('output.mp4')
    os.unlink('output_compatible.mp4')

    return StreamingResponse(
        io.BytesIO(output_data),
        media_type="video/mp4",
        headers={
            "Content-Disposition": "attachment; filename=processed.mp4"
        }
    )


@app.post("/api/tools/baby-track/process-frame")
async def process_frame_endpoint(
    file: UploadFile = File(...),
    shape: str = Form("basic"),
    region_style: str = Form("random"),
    connection_rate: float = Form(0.5),
    stroke_width: int = Form(2),
    blob_count: int = Form(64),
    text_position: str = Form("center"),
    font_size: int = Form(16),
    filters: str = Form(""),
    min_area: int = Form(100),
    max_blobs: int = Form(500)
):
    """
    Process a single frame and return as image
    """
    # Parse filters
    filter_list = filters.split(",") if filters else []

    settings = ProcessingSettings(
        shape=shape,
        region_style=region_style,
        connection_rate=connection_rate,
        stroke_width=stroke_width,
        blob_count=blob_count,
        text_position=text_position,
        font_size=font_size,
        filters=filter_list,
        min_area=min_area,
        max_blobs=max_blobs
    )

    # Read image
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if frame is None:
        return {"error": "Failed to decode image"}

    # Create tracker and process
    tracker = BlobTracker()
    processed = tracker.process_frame(frame, settings)

    # Encode as JPEG
    _, buffer = cv2.imencode('.jpg', processed)
    output = io.BytesIO(buffer)

    return StreamingResponse(
        output,
        media_type="image/jpeg"
    )


@app.websocket("/ws/tools/baby-track/stream")
async def websocket_stream(websocket: WebSocket):
    """
    WebSocket endpoint for real-time frame streaming
    """
    await websocket.accept()
    active_connections.append(websocket)

    # Create tracker
    tracker = BlobTracker()
    settings = ProcessingSettings()

    try:
        while True:
            # Receive frame data
            data = await websocket.receive_bytes()

            # Decode frame
            nparr = np.frombuffer(data, np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            if frame is not None:
                # Process frame
                processed = tracker.process_frame(frame, settings)

                # Encode and send back
                _, buffer = cv2.imencode('.jpg', processed)
                await websocket.send_bytes(buffer.tobytes())
            else:
                # Send empty frame
                await websocket.send_bytes(b"")

    except WebSocketDisconnect:
        active_connections.remove(websocket)
    except Exception as e:
        print(f"WebSocket error: {e}")
        if websocket in active_connections:
            active_connections.remove(websocket)


@app.post("/ws/tools/baby-track/update-settings")
async def update_websocket_settings(settings: SettingsRequest):
    """
    Update settings for all connected WebSocket clients
    """
    for connection in active_connections:
        await connection.send_json({
            "type": "settings_update",
            "settings": settings.model_dump()
        })
    return {"status": "ok", "connections": len(active_connections)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)