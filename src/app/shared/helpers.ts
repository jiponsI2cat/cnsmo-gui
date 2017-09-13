'use strict'

export module Helpers {

  /**
   * This function compares two objects by converting they to string format
   * and then returns true if they are equals
   * @param obj1
   * @param obj2
   */
  export function objectsAreEquals(obj1: object, obj2: object): boolean {
    if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
      return true;
    }
    return false;
  }

}
