// Sport metadata for the Youth Camps section, including the example video
// for each sport. These are real, currently-live YouTube videos (found and
// checked by hand, not guessed) standing in until Brian's has its own camp
// footage -- swap `videoId` for your own YouTube video's ID, found in its
// URL (youtube.com/watch?v=THIS_PART), and update `videoCredit` or remove
// it once it's your own footage.

export const SPORTS = {
  flag_football: {
    label: "Flag Football",
    description:
      "Ball-handling, flag-pulling technique, and small-sided games for young players.",
    videoId: "oDYmoCXraeE",
    videoTitle: "Ball Carrying Drills | NFL Flag Football Drills",
    videoCredit: "Example video via NFL FLAG on YouTube -- replace with your own camp footage.",
  },
  soccer: {
    label: "Soccer",
    description:
      "Footwork, passing, and game-speed decision making, scaled for younger athletes.",
    videoId: "Vv-jR6uGGRc",
    videoTitle: "5 Best Soccer Drills for U8 & U9",
    videoCredit: "Example video via Advance.Football on YouTube -- replace with your own camp footage.",
  },
  track: {
    label: "Track",
    description:
      "Running form, speed development, and an introduction to core track events.",
    videoId: "kmJkqJKN82k",
    videoTitle: "Kids Athletic Sports Training: Improve Running Form",
    videoCredit: "Example video via YouTube -- replace with your own camp footage.",
  },
};

export function getSport(key) {
  return SPORTS[key] || null;
}
