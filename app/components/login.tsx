import { useRouter } from "next/navigation";
import { Divider } from "antd";
import { useState, useEffect } from "react";
import styles from "./login.module.scss";
import BotIcon from "../icons/ic_user.svg";
import LoadingIcon from "../icons/three-dots.svg";
import Image from "next/image";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { useAccessStore, useUserStore } from "../store";
import { usePathname } from "next/navigation";
const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

const baseMethod = async (fn: any) => {
  if (fn) {
    try {
      const res = await fn;
      const data = await res.json();
      if (data.code === 0) {
        return data.data;
      } else {
        return "";
      }
    } catch (error) {
      return null;
    }
  }
};

const post = async (url: any, options: any) => {
  const token = window.localStorage.getItem("token") || "";
  const res = await baseMethod(
    fetch(url, {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(options),
    }),
  );
  return res;
};

async function loginApi(options: any) {
  return await post(`//oven-api.hetscene.com/ai/web/login`, options);
}

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"] + " no-dark"}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}

export function Login() {
  const router = useRouter();
  const pathname = usePathname();
  const [updateSessionToken] = useUserStore((state) => [
    state.updateSessionToken,
  ]);
  if (!useHasHydrated()) {
    return <Loading />;
  }
  const login = async (val: any) => {
    const res = await await loginApi({
      userName: val.username,
      password: val.password,
    });
    console.log(res, pathname, "res");
    if (res.token) {
      updateSessionToken(res.token);
      router.push("/home");
    }
  };
  return (
    <div className={styles["login-background"]}>
      <Image
        width={1000}
        height={1000}
        src="/img_bg.webp"
        className={styles["login-left"]}
        alt="Picture of the author"
      />
      <div className={styles["login-right"]}>
        <LoginForm
          className={styles["login-page"]}
          onFinish={login}
          actions={
            <span className={styles["login-register-tip"]}>
              注册请在OA系统发起上网功能申请
            </span>
          }
        >
          <div style={{ marginBottom: "56px" }}>
            <div style={{ display: "flex" }}>
              <Image
                src={"/ic_logo.png"}
                alt="LOGO"
                width={96}
                height={96}
              ></Image>
              <div style={{ display: "grid", marginLeft: "20px" }}>
                <span className={styles["login-title-upper"]}>
                  和而泰数字助理机器人
                </span>
                <span className={styles["login-title-below"]}>
                  Your personal ChatGPT Chat Bot.
                </span>
              </div>
            </div>
            <div style={{ marginTop: "16px" }}>
              <span className={styles["login-dec"]}>
                智能、高效、专业的企业级AI服务
              </span>
            </div>
          </div>
          <div style={{ marginBottom: "60px" }}>
            <span className={styles["login-password-title"]}>密码登录</span>
            <div className={styles["login-password-title"]}>
              <div className={styles["login-title-line"]}></div>
            </div>
          </div>
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} rev={undefined} />,
            }}
            placeholder={"请输入您的账号"}
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} rev={undefined} />,
            }}
            placeholder={"请输入您的密码"}
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          />
        </LoginForm>
      </div>
    </div>
  );
}

// import {
//   LockOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
// import {
//   LoginFormPage,
//   ProFormText,
// } from '@ant-design/pro-components';
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from 'react';
// import styles from "./login.module.scss";
// import BotIcon from "../icons/bot.svg";
// import LoadingIcon from "../icons/three-dots.svg";
// import { Image } from 'antd';
// import { Home } from './home';

// const useHasHydrated = () => {
//   const [hasHydrated, setHasHydrated] = useState<boolean>(false);
//   useEffect(() => {
//     setHasHydrated(true);
//   }, []);

//   return hasHydrated;
// };

// export function Loading(props: { noLogo?: boolean }) {
//   return (
//     <div className={styles["loading-content"] + " no-dark"}>
//       {!props.noLogo && <BotIcon />}
//       <LoadingIcon />
//     </div>
//   );
// }
// const baseMethod = async (fn: any) => {
//   if (fn) {
//     try {
//       const res = await fn;
//       const data = await res.json();
//       if (data.code === 0) {
//         return data.data;
//       } else {
//         return '';
//       }
//     } catch (error) {
//       return null;
//     }
//   }
// }

// const post = async (url: any, options: any) => {
//   const token = window.localStorage.getItem('token') || ''
//   const res = await baseMethod(
//     fetch(url, {
//       headers: {
//         // Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       method: "POST",
//       body: JSON.stringify(options),
//     })
//   );
//   return res;
// }

// async function loginApi(options: any) {
//   return await post(`//oven-api.hetscene.com/ai/web/login`, options);
// }

// export function Login() {
//   const router = useRouter()
//   if (!useHasHydrated()) {
//     return <Loading />;
//   }
//   const login = async (val: any) => {
//     const res = await (await loginApi({
//       userName: val.username,
//       password: val.password
//     }))
//     console.log(res, "res");
//     if (res.token) {
//       router.push('/home')
//     }

//   }
//   return (
//     <div
//       style={{
//         backgroundColor: 'white',
//         height: 'calc(100vh)',
//         width: 'calc(100vw)'
//       }}
//     >
//       <div className={styles["login-page"]}>
//         <LoginFormPage
//           backgroundImageUrl="/img_bg.png"
//           onFinish={login}
//           actions={
//             <span className={styles['login-register-tip']}>
//               注册请在OA系统发起上网功能申请
//             </span>
//           }
//         >
//           <div style={{ marginBottom: '56px' }}>
//             <div style={{ display: 'flex' }}>
//               <Image preview={false} src={"/ic_logo.png"} alt='LOGO' width={96} height={96}>

//               </Image>
//               <div style={{ display: 'grid', marginLeft: '20px' }}>
//                 <span className={styles['login-title-upper']}>
//                   和而泰数字助理机器人
//                 </span>
//                 <span className={styles['login-title-below']}>
//                   Your personal ChatGPT Chat Bot.
//                 </span>
//               </div>
//             </div>
//             <div style={{ marginTop: '16px' }}>
//               <span className={styles['login-dec']}>
//                 智能、高效、专业的企业级AI服务
//               </span>
//             </div>

//           </div>
//           <div style={{ marginBottom: '60px' }}>
//             <span className={styles["login-password-title"]}>密码登录</span>
//             <div className={styles["login-password-title"]}>
//               <div className={styles["login-title-line"]}></div>
//             </div>
//           </div>
//           <ProFormText
//             name="username"
//             fieldProps={{
//               size: 'large',
//               prefix: <UserOutlined className={'prefixIcon'} rev={undefined} />,
//             }}
//             placeholder={'请输入您的账号'}
//             rules={[
//               {
//                 required: true,
//                 message: '请输入用户名!',
//               },
//             ]}
//           />
//           <ProFormText.Password
//             name="password"
//             fieldProps={{
//               size: 'large',
//               prefix: <LockOutlined className={'prefixIcon'} rev={undefined} />,
//             }}
//             placeholder={'请输入您的密码'}
//             rules={[
//               {
//                 required: true,
//                 message: '请输入密码！',
//               },
//             ]}
//           />
//         </LoginFormPage>
//       </div>
//     </div>
//   );
// };
