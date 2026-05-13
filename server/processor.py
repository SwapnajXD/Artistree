"""
BabyTrack Processor - OpenCV-based blob tracking
"""
import cv2
import numpy as np
from dataclasses import dataclass
from typing import List, Tuple, Optional


@dataclass
class ProcessingSettings:
    """Settings for blob tracking processing"""
    shape: str = "basic"
    region_style: str = "random"
    connection_rate: float = 0.5
    stroke_width: int = 2
    blob_count: int = 64
    text_position: str = "center"
    font_size: int = 16
    filters: List[str] = None
    min_area: int = 100
    max_blobs: int = 500

    def __post_init__(self):
        if self.filters is None:
            self.filters = []


class BlobTracker:
    """Real-time blob tracking using OpenCV"""

    def __init__(self):
        self.fgbg = cv2.createBackgroundSubtractorMOG2(
            history=500,
            varThreshold=50,
            detectShadows=False
        )
        self.prev_frame = None

    def process_frame(self, frame: np.ndarray, settings: ProcessingSettings) -> np.ndarray:
        """Process a single frame and return annotated frame"""
        # Apply background subtraction
        fgmask = self.fgbg.apply(frame)

        # Morphological operations to reduce noise
        kernel = cv2.getStructuringElement(cv2.MORTH_ELLIPSE, (5, 5))
        fgmask = cv2.morphologyEx(fgmask, cv2.MORPH_OPEN, kernel, iterations=2)

        # Apply dilation to connect nearby blobs
        fgmask = cv2.dilate(fgmask, kernel, iterations=1)

        # Find contours (blobs)
        contours, _ = cv2.findContours(
            fgmask,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE
        )

        # Filter by area
        valid_contours = [
            c for c in contours
            if cv2.contourArea(c) >= settings.min_area
        ]

        # Sort by area (largest first) and limit
        valid_contours = sorted(valid_contours, key=cv2.contourArea, reverse=True)[:settings.max_blobs]

        # Draw shapes at blob centroids
        output = frame.copy()

        for contour in valid_contours:
            M = cv2.moments(contour)
            if M["m00"] != 0:
                cx = int(M["m10"] / M["m00"])
                cy = int(M["m01"] / M["m00"])

                # Get bounding box for shape sizing
                x, y, w, h = cv2.boundingRect(contour)
                size = min(w, h)

                self._draw_shape(output, cx, cy, size, settings)

        # Apply filters
        for filter_name in settings.filters:
            output = self._apply_filter(output, filter_name)

        return output

    def _draw_shape(
        self,
        img: np.ndarray,
        x: int,
        y: int,
        size: int,
        settings: ProcessingSettings
    ) -> None:
        """Draw shape at position"""
        color = self._get_color(x, y, img.shape)
        sw = settings.stroke_width
        half_size = max(size // 4, 5)

        shape_funcs = {
            "basic": lambda: cv2.circle(img, (x, y), half_size, color, sw),
            "cross": lambda: self._draw_cross(img, x, y, half_size, color, sw),
            "label": lambda: self._draw_label(img, x, y, f"Blob", color, settings.font_size),
            "frame": lambda: cv2.rectangle(img, (x - half_size, y - half_size), (x + half_size, y + half_size), color, sw),
            "l-frame": lambda: self._draw_lframe(img, x, y, half_size, color, sw),
            "x-frame": lambda: self._draw_xframe(img, x, y, half_size, color, sw),
            "grid": lambda: self._draw_grid(img, x, y, half_size, color, sw),
            "particle": lambda: self._draw_particle(img, x, y, half_size, color),
            "dash": lambda: self._draw_dash(img, x, y, half_size, color, sw),
            "scope": lambda: self._draw_scope(img, x, y, half_size, color, sw),
            "win2k": lambda: self._draw_win2k(img, x, y, half_size, color, sw),
            "label 2": lambda: self._draw_label(img, x, y, f"({x},{y})", color, settings.font_size - 2),
            "glow": lambda: self._draw_glow(img, x, y, half_size, color),
            "backdrop": lambda: self._draw_backdrop(img, x, y, half_size, color),
        }

        shape_func = shape_funcs.get(settings.shape, shape_funcs["basic"])
        shape_func()

    def _draw_cross(self, img: np.ndarray, x: int, y: int, size: int, color: Tuple, thickness: int) -> None:
        cv2.line(img, (x - size, y), (x + size, y), color, thickness)
        cv2.line(img, (x, y - size), (x, y + size), color, thickness)

    def _draw_lframe(self, img: np.ndarray, x: int, y: int, size: int, color: Tuple, thickness: int) -> None:
        pts = np.array([
            [x - size, y - size],
            [x + size, y - size],
            [x + size, y],
            [x, y],
            [x, y + size],
            [x - size, y + size]
        ], np.int32).reshape((-1, 1, 2))
        cv2.polylines(img, [pts], False, color, thickness)

    def _draw_xframe(self, img: np.ndarray, x: int, y: int, size: int, color: Tuple, thickness: int) -> None:
        cv2.line(img, (x - size, y - size), (x + size, y + size), color, thickness)
        cv2.line(img, (x + size, y - size), (x - size, y + size), color, thickness)

    def _draw_grid(self, img: np.ndarray, x: int, y: int, size: int, color: Tuple, thickness: int) -> None:
        for i in range(-2, 3):
            offset = i * (size // 3)
            cv2.line(img, (x + offset, y - size), (x + offset, y + size), color, 1)
            cv2.line(img, (x - size, y + offset), (x + size, y + offset), color, 1)

    def _draw_particle(self, img: np.ndarray, x: int, y: int, size: int, color: Tuple) -> None:
        cv2.circle(img, (x, y), size, color, -1)

    def _draw_dash(self, img: np.ndarray, x: int, y: int, size: int, color: Tuple, thickness: int) -> None:
        for i in range(-2, 3):
            offset = i * (size // 2)
            cv2.line(img, (x - size, y + offset), (x - size // 2, y + offset), color, thickness)
            cv2.line(img, (x + size // 2, y + offset), (x + size, y + offset), color, thickness)

    def _draw_scope(self, img: np.ndarray, x: int, y: int, size: int, color: Tuple, thickness: int) -> None:
        cv2.circle(img, (x, y), size, color, thickness)
        cv2.line(img, (x - size, y), (x - size // 2, y), color, thickness)
        cv2.line(img, (x + size // 2, y), (x + size, y), color, thickness)
        cv2.line(img, (x, y - size), (x, y - size // 2), color, thickness)
        cv2.line(img, (x, y + size // 2), (x, y + size), color, thickness)

    def _draw_win2k(self, img: np.ndarray, x: int, y: int, size: int, color: Tuple, thickness: int) -> None:
        cv2.circle(img, (x, y), size, color, thickness)
        cv2.circle(img, (x, y), size // 2, color, thickness)

    def _draw_label(self, img: np.ndarray, x: int, y: int, text: str, color: Tuple, font_size: int) -> None:
        cv2.putText(
            img, text,
            (x - 20, y + 5),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.4,
            color,
            1,
            cv2.LINE_AA
        )

    def _draw_glow(self, img: np.ndarray, x: int, y: int, size: int, color: Tuple) -> None:
        # Draw glow effect (multiple circles with decreasing opacity)
        for i in range(3, 0, -1):
            alpha = 0.3 / i
            radius = size * i
            overlay = img.copy()
            cv2.circle(overlay, (x, y), radius, color, -1)
            cv2.addWeighted(overlay, alpha, img, 1 - alpha, 0, img)

    def _draw_backdrop(self, img: np.ndarray, x: int, y: int, size: int, color: Tuple) -> None:
        # Draw semi-transparent circle
        overlay = img.copy()
        cv2.circle(overlay, (x, y), size, color, -1)
        cv2.addWeighted(overlay, 0.5, img, 0.5, 0, img)

    def _get_color(self, x: int, y: int, shape: Tuple) -> Tuple:
        """Generate consistent color based on position"""
        # Use golden ratio for nice color distribution
        hue = ((x + y) * 137.508) % 360
        hsv = np.array([[[hue, 255, 255]]], dtype=np.uint8)
        bgr = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)[0][0]
        return (int(bgr[0]), int(bgr[1]), int(bgr[2]))

    def _apply_filter(self, img: np.ndarray, filter_name: str) -> np.ndarray:
        """Apply visual filter to image"""
        filters = {
            "invert": lambda: cv2.bitwise_not(img),
            "fusion": lambda: self._apply_fusion(img),
            "glitch": lambda: self._apply_glitch(img),
            "thermal": lambda: self._apply_thermal(img),
            "pixel": lambda: self._apply_pixelate(img),
            "tone": lambda: self._apply_tone(img),
            "blur": lambda: cv2.GaussianBlur(img, (15, 15), 0),
            "dither": lambda: self._apply_dither(img),
            "zoom": lambda: self._apply_zoom(img),
            "x-ray": lambda: self._apply_xray(img),
            "water": lambda: self._apply_water(img),
            "mask": lambda: self._apply_mask(img),
            "crt": lambda: self._apply_crt(img),
            "edge": lambda: self._apply_edge(img),
            "blink": lambda: self._apply_blink(img),
        }

        filter_func = filters.get(filter_name.lower())
        if filter_func:
            return filter_func()
        return img

    def _apply_fusion(self, img: np.ndarray) -> np.ndarray:
        # Overlay with gradient
        overlay = img.copy()
        gradient = np.linspace(0, 1, img.shape[1], dtype=np.float32)
        gradient = np.stack([gradient] * 3, axis=-1)
        overlay = (overlay.astype(np.float32) * gradient).astype(np.uint8)
        return cv2.addWeighted(img, 0.5, overlay, 0.5, 0)

    def _apply_glitch(self, img: np.ndarray) -> np.ndarray:
        # RGB shift
        b, g, r = cv2.split(img)
        shift = 5
        result = cv2.merge([
            np.roll(b, shift, 1),
            g,
            np.roll(r, -shift, 1)
        ])
        return result

    def _apply_thermal(self, img: np.ndarray) -> np.ndarray:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        thermal = cv2.applyColorMap(gray, cv2.COLORMAP_JET)
        return thermal

    def _apply_pixelate(self, img: np.ndarray, size: int = 10) -> np.ndarray:
        h, w = img.shape[:2]
        small = cv2.resize(img, (w // size, h // size), interpolation=cv2.INTER_NEAREST)
        return cv2.resize(small, (w, h), interpolation=cv2.INTER_NEAREST)

    def _apply_tone(self, img: np.ndarray) -> np.ndarray:
        # Halftone effect
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        dots = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2)
        return cv2.cvtColor(dots, cv2.COLOR_GRAY2BGR)

    def _apply_dither(self, img: np.ndarray) -> np.ndarray:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, dither = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
        return cv2.cvtColor(dither, cv2.COLOR_GRAY2BGR)

    def _apply_zoom(self, img: np.ndarray) -> np.ndarray:
        h, w = img.shape[:2]
        zoom = cv2.resize(img, (w // 2, h // 2))
        zoomed = cv2.resize(zoom, (w, h))
        # Blend with original
        return cv2.addWeighted(img, 0.5, zoomed, 0.5, 0)

    def _apply_xray(self, img: np.ndarray) -> np.ndarray:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        inverted = 255 - gray
        return cv2.cvtColor(inverted, cv2.COLOR_GRAY2BGR)

    def _apply_water(self, img: np.ndarray) -> np.ndarray:
        # Ripple effect using displacement
        rows, cols = img.shape[:2]
        map_x = np.zeros((rows, cols), dtype=np.float32)
        map_y = np.zeros((rows, cols), dtype=np.float32)

        for i in range(rows):
            for j in range(cols):
                x = j + 10 * np.sin(i / 20.0)
                y = i + 10 * np.sin(j / 20.0)
                map_x[i, j] = x
                map_y[i, j] = y

        return cv2.remap(img, map_x, map_y, cv2.INTER_LINEAR)

    def _apply_mask(self, img: np.ndarray) -> np.ndarray:
        h, w = img.shape[:2]
        mask = np.zeros((h, w), dtype=np.uint8)
        cv2.circle(mask, (w // 2, h // 2), min(w, h) // 3, 255, -1)
        result = img.copy()
        result[mask == 0] = 0
        return result

    def _apply_crt(self, img: np.ndarray) -> np.ndarray:
        # Scanlines
        result = img.copy()
        for i in range(0, img.shape[0], 2):
            result[i:i+1, :] = 0
        return result

    def _apply_edge(self, img: np.ndarray) -> np.ndarray:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 50, 150)
        return cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)

    def _apply_blink(self, img: np.ndarray) -> np.ndarray:
        # Flashing effect (random brightness)
        import random
        if random.random() > 0.5:
            return img
        return cv2.convertScaleAbs(img, alpha=2, beta=0)

    def reset(self) -> None:
        """Reset the tracker state"""
        self.fgbg = cv2.createBackgroundSubtractorMOG2(
            history=500,
            varThreshold=50,
            detectShadows=False
        )
        self.prev_frame = None