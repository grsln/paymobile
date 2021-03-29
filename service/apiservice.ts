const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

class ApiService {
  request() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (getRandomInt(0, 100) < 75) {
          if (getRandomInt(0, 100) < 66) {
            resolve({ status: "OK" });
          } else resolve({ status: "Error" });
        } else reject({});
      }, 3000 * (getRandomInt(0, 3) + 1));
    });
    return promise;
  }
}

export default new ApiService();
