import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/*return a promise hilding an array of our score objects. *game aparmeter is either "memory", "snake" or "minesweeper" (collection id)
 *oderBy is an array containting sorting instructins, e.g.:
 * [["score, "desc], [ timeMS]], "asc"]]
 */

export function fetchLeaderboard(game, orderBy) {
  const auth = firebase.auth();
  const db = firebase.firestore();
  return auth
    .signInAnonymously()
    .then(() => {
      let query = db.collection(game);
      orderBy.forEach((rule) => {
        query = query.orderBy(...rule);
      });
      return query.limit(10).get();
    })
    .then((querySnapshot) => {
      let leaderboard = [];
      querySnapshot.forEach((doc) => {
        leaderboard.push(doc.data());
      });
      return leaderboard;
    })
    .catch(function (error) {
      console.log("Error error explosion bang. Getting leaderboard: ", error);
    });
}

export function saveScore(game, score) {
  const auth = firebase.auth();
  const db = firebase.firestore();
  return auth
    .signInAnonymously()
    .then(() => db.collection(game).add(score))
    .catch(function (error) {
      console.log("Error saving score: ", error);
    });
}
