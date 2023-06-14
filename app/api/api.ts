const BASE_REQURL = "https://ai.baidu.com";
//获取用户信息
export async function queryUserInfo() {
  return fetch(`${BASE_REQURL}/api/openai/chat/getUseTimes/`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "source-token": localStorage.token,
    },
    method: "get",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.code === 200) {
        alert("查询成功");
        console.log("这里执行成功后代码");
      } else {
        alert(data.message);
        console.log("这里执行错误后报错代码");
      }
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
}

//登录
export async function LoginByUser() {
  return fetch(`${BASE_REQURL}/api/openai/chat/login/`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    method: "post",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.code === 200) {
        alert("查询成功");
        console.log("这里执行成功后代码");
      } else {
        alert(data.message);
        console.log("这里执行错误后报错代码");
      }
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
}

//获取模型类型
export async function getGptModels() {
  return fetch(`${BASE_REQURL}/api/openai/chat/getGptModels/`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "source-token": localStorage.token,
    },
    method: "get",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.code === 200) {
        alert("查询成功");
        console.log("这里执行成功后代码");
      } else {
        alert(data.message);
        console.log("这里执行错误后报错代码");
      }
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
}
