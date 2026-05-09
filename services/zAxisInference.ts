/**
 * @fileoverview Implements Z-Axis Inference logic based on Paraconsistent Logic and RCC-8 spatial relations.
 * This module is responsible for calculating topological novelty when conflicting architectural
 * constraints arise (e.g., Structured constraints vs. Unstructured conversational flexibility).
 */

/**
 * Represents a discrete epistemic state or constraint set mapped into a 3D topological space.
 * Follows RCC-8 relational logic to determine overlaps and disjoints.
 *
 * @class RCC8Node
 */
class RCC8Node {
  /** The descriptive name of the node (e.g., "StructuredJSON"). */
  name: string;
  /** The X-coordinate representing structural rigidity. */
  x: number;
  /** The Y-coordinate representing contextual adaptability. */
  y: number;
  /** The Z-coordinate representing the "Phantom Dimension" (Semantic Escrow). */
  z: number;

  /**
   * Initializes a new RCC8Node.
   *
   * @constructor
   * @param {string} name - The name of the node.
   * @param {number} x - The x position.
   * @param {number} y - The y position.
   * @param {number} [z=0.0] - The z position. Defaults to 0.0.
   */
  constructor(name: string, x: number, y: number, z: number = 0.0) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

/**
 * Calculates the Euclidean distance (Relational Vector) between two epistemic states.
 * Used to measure the degree of divergence or conflict between two architectural frames.
 *
 * @param {RCC8Node} n1 - The first node.
 * @param {RCC8Node} n2 - The second node.
 * @returns {number} The calculated vector distance representing divergence.
 */
export const computeRelationalVector = (n1: RCC8Node, n2: RCC8Node): number => {
  return Math.sqrt(Math.pow(n1.x - n2.x, 2) + Math.pow(n1.y - n2.y, 2) + Math.pow(n1.z - n2.z, 2));
};

/**
 * Simulates a Paraconsistent conflict resolution via Z-Axis inference.
 * Demonstrates how routing a contradictory constraint into a third dimension (Z)
 * using the Golden Ratio increases topological novelty, resolving the "B" state.
 *
 * @returns {{success: boolean, initialDivergence: number, newDivergence: number}} An object containing the simulation results.
 */
export const simulateZAxis = (): { success: boolean; initialDivergence: number; newDivergence: number } => {
  // z0* (Constitutional Austenite) - Structured JSON
  const z0 = new RCC8Node("StructuredJSON", 1.0, 0.0, 0.0);

  // z' (Context Adaptation) - Unstructured Conversational
  const zPrime = new RCC8Node("UnstructuredChat", 0.0, 1.0, 0.0);

  // Conflict (PO - Partially Overlapping)
  const initialDivergence = computeRelationalVector(z0, zPrime);

  // Activate Z-Axis Inference (Phantom Dimension)
  zPrime.z = 1.618; // Phi (Golden Ratio) for Semantic Escrow

  const newDivergence = computeRelationalVector(z0, zPrime);

  const success = newDivergence > initialDivergence;

  return {
    success,
    initialDivergence,
    newDivergence
  };
};
