/* recive string with robots value transform to object with boolean value */
export const transformRobotsToBoolean = robots => {
  const splitedArray = robots.split(", ");
  return {
    noindex: splitedArray.indexOf("noindex") !== -1,
    nofollow: splitedArray.indexOf("nofollow") !== -1,
  };
};
