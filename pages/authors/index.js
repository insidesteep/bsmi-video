import Cookies from "js-cookie";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import config from "../../config/config";

const { appUrl, serverPort } = config;
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

const Authors = ({ authors, totalCount, itemPerPage = 10, a }) => {
  const pageNumbers = [];

  const [page, setPage] = useState(1);
  const [authorList, setAuthorList] = useState([]);
  const [authorTotal, setAuthorTotal] = useState(0);
  const [author, setAuthor] = useState({
    firstname: "",
    lastname: "",
    patronymic: "",
    authorId: null,
  });
  const [isEdit, setIsEdit] = useState(false);
  const nameRef = useRef(null);
  const router = useRouter();

  for (let i = 1; i <= Math.ceil(totalCount / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  // useEffect(() => {
  //   const auth = Cookies.get("auth");

  //   if (!auth) {
  //     Router.replace("/login");
  //   }
  // }, []);

  useEffect(() => {
    setAuthorList(authors);
  }, [authors]);

  useEffect(() => {
    setAuthorTotal(totalCount);
  }, [totalCount]);

  useEffect(() => {
    const { page } = router.query;

    if (page) {
      setPage(page);
    }
  }, router.query.page);

  const handleChangeAuthor = (e) => {
    setAuthor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSaveAuthor = async () => {
    const { firstname, lastname, patronymic } = author;

    try {
      const res = await fetch(`${appUrl}:${serverPort}/api/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, patronymic }),
      });

      const authors = await res.json();

      if (authors.data) {
        setAuthorList(authors.authors);
        setAuthorTotal(authors.count);
      }
    } catch (error) {
      console.error(error, author);
      alert("Ошибка при создании автора!");
    }
  };

  const onEdit = (data) => {
    setIsEdit(true);
    setAuthor(data);

    nameRef.current.focus();
  };

  const reset = () => {
    setAuthor({
      firstname: "",
      lastname: "",
      patronymic: "",
      authorId: "",
    });

    setIsEdit(false);
  };

  const onUpdateAuthor = async (data) => {
    try {
      const res = await fetch(`${appUrl}:${serverPort}/api/authors`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(author),
      });

      const result = await res.json();

      console.log(result);

      if (result.success) {
        nameRef.current.blur();

        reset();

        setAuthorList((prev) =>
          prev.map((i) => {
            if (i._id == result.data._id) return result.data;

            return i;
          })
        );
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка при обновлении автора!");
    }
  };

  return (
    <div className="container-fluid upload-details ">
      <div className="row">
        <div className="col-lg-12">
          <div className="main-title">
            <h6>{isEdit ? "Редактирование автора" : "Новый автор"}</h6>
          </div>
        </div>
      </div>
      <hr />
      <hr />
      <div className="row">
        <div className="col-lg-12">
          <div className="osahan-form">
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <div className="d-flex alig-items-center">
                    <input
                      ref={nameRef}
                      onChange={handleChangeAuthor}
                      value={author.lastname}
                      name="lastname"
                      type="text"
                      placeholder="Фамилия"
                      id="e1"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <div className="d-flex alig-items-center">
                    <input
                      onChange={handleChangeAuthor}
                      value={author.firstname}
                      name="firstname"
                      type="text"
                      placeholder="Имя"
                      id="e1"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <div className="d-flex alig-items-center">
                    <input
                      onChange={handleChangeAuthor}
                      value={author.patronymic}
                      name="patronymic"
                      type="text"
                      placeholder="Отчество"
                      id="e1"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="osahan-area text-center mt-3">
            <button
              className="btn btn-outline-primary"
              disabled={!author.firstname || !author.lastname}
              onClick={isEdit ? onUpdateAuthor : onSaveAuthor}
            >
              {isEdit ? "Обновить" : "Сохранить"}
            </button>
            {isEdit && (
              <button
                className="btn btn-outline-secondary"
                disabled={!author.firstname || !author.lastname}
                onClick={reset}
              >
                Отменить
              </button>
            )}
          </div>
          {/* <div className="terms text-center">
            <p className="mb-0">
              There are many variations of passages of Lorem Ipsum available,
              but the majority <a href="#">Terms of Service</a> and{" "}
              <a href="#">Community Guidelines</a>.
            </p>
            <p className="hidden-xs mb-0">
              Ipsum is therefore always free from repetition, injected humour,
              or non
            </p>
          </div> */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="main-title">
            <h6>Авторы</h6>
          </div>
        </div>
      </div>
      <div className="row">
        {authorList && authorList.length > 0 ? (
          <>
            <table className="table table-dark  table-bordered table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Фамилия</th>
                  <th scope="col">Имя</th>
                  <th scope="col">Отчество</th>
                  <th scope="col" align="right">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {authorList.map((author, idx) => (
                  <tr key={author._id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{author.lastname}</td>
                    <td>{author.firstname}</td>
                    <td>{author.patronymic}</td>
                    <td align="right">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          onEdit({
                            firstname: author.firstname,
                            lastname: author.lastname,
                            patronymic: author.patronymic || "",
                            authorId: author._id,
                          })
                        }
                      >
                        Изменить
                      </button>
                      <button type="button" className="btn btn-primary btn-sm">
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {authorList.length > 0 && (
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center pagination-sm mb-4">
                  <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
                    <Link
                      className="page-link"
                      href={`/authors?page=${page - 1}`}
                      tabIndex="-1"
                    >
                      Предыдущий
                    </Link>
                  </li>
                  {pageNumbers.map((number) => (
                    <li
                      className={`page-item ${page == number && "active"}`}
                      key={number}
                    >
                      <Link
                        className="page-link"
                        href={`/authors?page=${number}`}
                      >
                        {number}
                      </Link>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      page >= pageNumbers ? "disabled" : ""
                    }`}
                  >
                    <Link
                      className="page-link"
                      href={`/authors?page=${page + 1}`}
                    >
                      Следующий
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </>
        ) : (
          <p className="text-center">Авторы не найдены</p>
        )}
      </div>
    </div>
  );
};

export default Authors;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req?.headers.cookie;

  const { page } = ctx.query;

  const res = await fetch(
    `http:/localhost:3000/api/authors?page=${page || 1}`,
    {
      headers: {
        cookie,
      },
    }
  );

  if (res.status == 401 && !ctx.req) {
    Router.replace("/login");
    return {};
  }

  if (res.status == 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: "${appUrl}:${serverPort}/login",
    });

    ctx.res?.end();

    return { props: {} };
  }

  let { data } = await res.json();

  return {
    props: {
      authors: data.authors,
      totalCount: data.count,
    },
  };
}
