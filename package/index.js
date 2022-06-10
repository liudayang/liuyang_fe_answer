/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => "hello world";

exports.stripPrivateProperties = (keys, data) => {
  data.forEach(i => {
    keys.forEach(key => {
      delete i[key];
    });
  });
  return data;
};
exports.excludeByProperty = (key, data) => {
  data.forEach((item, index) => {
    if (item[key] === true) {
      data.splice(index, 1);
    }
  });
  return data;
};
exports.sumDeep = data => {
  let newData = JSON.parse(JSON.stringify(data));
  data.forEach((item, index) => {
    let childData = item["objects"];
    let total = childData.reduce(
      (pre, next) => {
        return { val: pre.val + next.val };
      },
      { val: 0 }
    );
    newData[index]["objects"] = total.val;
  });
  return newData;
};
exports.applyStatusColor = (colorEnum, statusArray) => {
  let tempColor = {};
  for (const key in colorEnum) {
    colorEnum[key].forEach((item, index) => {
      tempColor[item] = key;
    });
  }
  statusArray.forEach((item, index) => {
    let status = item.status;
    if (tempColor[status]) {
      item["color"] = tempColor[status];
    } else {
      statusArray.splice(index, 1);
    }
  });
  return statusArray;
};
exports.createGreeting = (cb, saying) => name => cb(saying, name);
exports.setDefaults = defaultProps => {
  return function(data) {
    for (const key in defaultProps) {
      if (data[key] === undefined) {
        data[key] = defaultProps[key];
      }
    }
    return data;
  };
};
exports.fetchUserByNameAndUsersCompany = (name, services) => {
  return new Promise((resolve, reject) => {
    let promiseArr = Object.values(services);
    let companiePromiseFunc = promiseArr.splice(2, 1);
    let x = promiseArr.map(func => func());
    Promise.all(x).then(res => {
      let [status, users] = res;
      let user = users.find(i => i.name === name);
      companiePromiseFunc[0](user.companyId).then(r => {
        resolve({
          status,
          user,
          company: r
        });
      });
    });
  });
};
