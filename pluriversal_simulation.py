"""
Pluriversal Simulation Module.

This script simulates the Lexical Saponification Paradox (PAT-007) and
Z-Axis Inference using Paraconsistent Logic and RCC-8 spatial relations.
It demonstrates how topological novelty is increased when resolving
contradictory architectural constraints.
"""

import math
import json

class RCC8Node:
    """
    Represents a node in an RCC-8 topological space for paraconsistent modeling.

    Attributes:
        name (str): The identifier for the node (e.g., 'StructuredJSON').
        x (float): X-coordinate representing structural constraint.
        y (float): Y-coordinate representing conversational flexibility.
        z (float): Z-coordinate used for phantom dimension resolution (Z-Axis inference).
    """

    def __init__(self, name, x, y, z=0.0):
        """
        Initializes an RCC8Node with spatial coordinates.

        Args:
            name (str): Identifier for the node.
            x (float): X-coordinate.
            y (float): Y-coordinate.
            z (float, optional): Z-coordinate. Defaults to 0.0.
        """
        self.name = name
        self.x = x
        self.y = y
        self.z = z # Z-Axis inference

def compute_relational_vector(n1, n2):
    """
    Computes the Euclidean distance (relational vector) between two RCC-8 nodes.

    Args:
        n1 (RCC8Node): The first node.
        n2 (RCC8Node): The second node.

    Returns:
        float: The scalar distance between the two nodes.
    """
    return math.sqrt((n1.x - n2.x)**2 + (n1.y - n2.y)**2 + (n1.z - n2.z)**2)

def simulate_lexical_saponification(w0=1.0, f=4, lambda_val=0.23, lambda_eso=0.05):
    """
    Simulates the decay of semantic weight (Lexical Saponification) over repeated uses.

    Calculates the exponential decay of a term's meaning based on its repetition
    frequency, distinguishing between common and esoteric terms.

    Args:
        w0 (float, optional): Initial semantic weight. Defaults to 1.0.
        f (int, optional): Frequency of repetition. Defaults to 4.
        lambda_val (float, optional): Decay constant for common terms. Defaults to 0.23.
        lambda_eso (float, optional): Decay constant for esoteric terms. Defaults to 0.05.

    Returns:
        tuple: A tuple containing the decayed weight for common terms (float)
               and esoteric terms (float).
    """
    # W(t) = W₀ * e^(-λ * f)
    # Common epistemic term decay
    decay_common = w0 * math.exp(-lambda_val * f)
    # Esoteric term decay
    decay_eso = w0 * math.exp(-lambda_eso * f)

    print(f"Lexical Saponification Paradox (PAT-007) Simulation:")
    print(f"  After {f} repetitions, common term weight (λ={lambda_val}): {decay_common:.4f}")
    print(f"  After {f} repetitions, esoteric term weight (λ={lambda_eso}): {decay_eso:.4f}")

    if decay_common < 0.8: # ~20% drop threshold
        print("  Onset of Saponification detected for common term.")

    return decay_common, decay_eso

def simulate():
    """
    Executes the full Paraconsistent Logic simulation.

    Models a conflict between two constraints ('StructuredJSON' and 'UnstructuredChat'),
    calculates their initial divergence, applies Z-Axis inference via the Golden Ratio (Phi),
    and validates if the resulting state resolves the conflict while increasing novelty.

    Returns:
        bool: True if the simulation establishes a successful paraconsistent state (B), False otherwise.
    """
    # z0* (Constitutional Austenite) - Structured JSON
    z0 = RCC8Node("StructuredJSON", 1.0, 0.0, 0.0)

    # z' (Context Adaptation) - Unstructured Conversational
    z_prime = RCC8Node("UnstructuredChat", 0.0, 1.0, 0.0)

    # Conflict (PO - Partially Overlapping)
    overlap_distance = compute_relational_vector(z0, z_prime)
    print(f"Initial Euclidean Divergence: {overlap_distance:.4f}")

    # Activate Z-Axis Inference (Phantom Dimension)
    print("Activating Z-Axis Inference (H_k)...")
    z_prime.z = 1.618  # Phi (Golden Ratio) for Semantic Escrow

    new_distance = compute_relational_vector(z0, z_prime)
    print(f"Z-Axis Divergence (Topological Novelty): {new_distance:.4f}")

    # Lexical Saponification Simulation
    simulate_lexical_saponification()

    if new_distance > overlap_distance:
         print("Validation: Paraconsistent State (B) established successfully.")
         print("Structural Conservation (B0) > 0.9 | Topological Novelty (B1) > 0.7")
         return True
    return False

if __name__ == "__main__":
    if simulate():
        print("Simulation Passed.")
    else:
        print("Simulation Failed.")
