import { useRouter } from "next/router";
import { useState } from "react";

import config from "../config/config";

const { appUrl, serverPort } = config;

export default function Login() {
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onLogin = async (e) => {
    e.preventDefault();

    if (form.login && form.password) {
      try {
        const res = await fetch(`${appUrl}:${serverPort}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: form.login,
            password: form.password,
          }),
        });

        const data = await res.json();

        if (data.success) {
          router.push("/");
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert("Ошибка)");
      }
    }
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="row no-gutters">
          <div className="col-md-12 p-5 bg-white full-height">
            <div className="login-main-left">
              <div className="text-center login-main-left-header">
                <img src="img/favicon.png" className="img-fluid" alt="LOGO" />
                <h5 className="mt-3 mb-3">Добро пожаловать в Vidoe</h5>
                <p>Войдите в систему</p>
              </div>
              <form action="index.html">
                <div className="form-group">
                  <label>Логин</label>
                  <input
                    name="login"
                    type="text"
                    className="form-control"
                    placeholder="Введите логин"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Пароль</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Пароль"
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-4">
                  <div className="row">
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-outline-primary btn-block btn-lg"
                        onClick={onLogin}
                      >
                        Войти
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
