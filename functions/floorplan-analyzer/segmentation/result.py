import numpy as np

_ROOM_LABELS = [
    "Background",
    "Outdoor",
    "Wall",
    "Kitchen",
    "Living Room",
    "Bed Room",
    "Bath",
    "Entry/Corridor",
    "Railing",
    "Storage",
    "Garage",
    "Undefined",
]

_ICON_LABELS = [
    "No Icon",
    "Window",
    "Door",
    "Closet",
    "Electrical Appliance",
    "Toilet",
    "Sink",
    "Sauna Bench",
    "Fire Place",
    "Bathtub",
    "Chimney",
]


def _geom_to_coord_lists(geom) -> list[list[list[float]]]:
    """Return a list of coordinate rings (one per sub-polygon)."""
    if hasattr(geom, "geoms"):
        return [_ring_coords(p) for p in geom.geoms]
    return [_ring_coords(geom)]


def _ring_coords(polygon) -> list[list[float]]:
    x, y = polygon.exterior.coords.xy
    return [
        [round(float(xi), 2), round(float(yi), 2)] for xi, yi in zip(x, y, strict=False)
    ]


def build_result(
    polygons: np.ndarray,
    types: list[dict],
    room_polygons: list,
    room_types: list[dict],
) -> dict:
    walls = []
    icons = []

    for polygon, t in zip(polygons, types, strict=False):
        coords = [[round(float(x), 2), round(float(y), 2)] for x, y in polygon]
        if t["type"] == "wall":
            walls.append({"polygon": coords})
        elif t["type"] == "icon":
            cls = int(t["class"])
            label = _ICON_LABELS[cls] if cls < len(_ICON_LABELS) else str(cls)
            icons.append({"label": label, "polygon": coords})

    rooms = []
    for geom, t in zip(room_polygons, room_types, strict=False):
        cls = int(t["class"])
        label = _ROOM_LABELS[cls] if cls < len(_ROOM_LABELS) else str(cls)
        for coords in _geom_to_coord_lists(geom):
            rooms.append({"label": label, "polygon": coords})

    return {"rooms": rooms, "walls": walls, "icons": icons}
