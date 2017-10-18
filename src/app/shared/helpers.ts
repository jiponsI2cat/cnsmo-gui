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

  /**
   * Regex of '${IP}/${MASK}' format.
   * For example, test of '192.168.0.1/24' with this regEx will return true
   */
  export const ipMaskRegEx = /((^|\.)((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]?\d))){4}\/(\?:\d|[12]\d|3[01])$/;


}
