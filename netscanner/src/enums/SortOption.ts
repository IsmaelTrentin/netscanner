/**
 * All the availables scan results sort options.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
export enum SortOption {

  /**
   * Sorts by IP.
   */
  BY_IP,

  /**
   * Sorts by state. IP sorting is still applied 
   * to results of the same state.
   */
  BY_STATE
}