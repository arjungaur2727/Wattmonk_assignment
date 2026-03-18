"""
RAG Embedder — uses sentence-transformers to embed text chunks locally.
Model: all-MiniLM-L6-v2 (fast, free, no API cost, great for semantic search)
"""

from sentence_transformers import SentenceTransformer
import numpy as np

# Global model instance (loaded once)
_model = None


def get_model() -> SentenceTransformer:
    """Load model once and reuse."""
    global _model
    if _model is None:
        print("Loading embedding model (first time may take a moment)...")
        _model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
        print("Embedding model loaded.")
    return _model


def embed_texts(texts: list[str]) -> np.ndarray:
    """
    Embed a list of texts into numpy vectors.
    Returns: np.ndarray of shape (len(texts), 384)
    """
    model = get_model()
    embeddings = model.encode(texts, convert_to_numpy=True, show_progress_bar=False)
    return embeddings.astype("float32")


def embed_query(query: str) -> np.ndarray:
    """
    Embed a single query string.
    Returns: np.ndarray of shape (1, 384)
    """
    model = get_model()
    embedding = model.encode([query], convert_to_numpy=True, show_progress_bar=False)
    return embedding.astype("float32")
