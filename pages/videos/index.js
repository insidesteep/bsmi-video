import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import "moment/locale/ru";

import config from "../../config/config";

const { appUrl, serverPort } = config;

moment.locale("ru");

export default function Videos({ videos, totalCount, itemPerPage = 12 }) {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const searchQuery = router.query.search
    ? `&search=${router.query.search}`
    : "";

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCount / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const { page } = router.query;

    if (page) {
      setPage(page);
    }
  }, router.query.page);

  const goTo = (id, path) => router.push(`/${path}/${id}`);

  const onDelete = async (id) => {
    const ok = confirm("Вы уверены, что хотите удалить видео?");

    if (ok) {
      try {
        const res = await fetch(`${appUrl}:${serverPort}/api/videos/${id}`, {
          method: "DELETE",
        });
        let result = await res.json();

        if (result.success) {
          alert("Видео успешно удалено");
          router.reload();
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container-fluid pb-0">
      <div className="video-block section-padding">
        <div className="row">
          <div className="col-md-12">
            <div className="main-title">
              <div className="btn-group float-right right-action">
                <a
                  href="#"
                  className="right-action-link text-gray"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Сортировать{" "}
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-fw fa-star"></i> &nbsp; Новые
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-fw fa-signal"></i> &nbsp; Популярные
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-fw fa-times-circle"></i> &nbsp; Закрыть
                  </a>
                </div>
              </div>
              <h6>
                {router.query.search
                  ? `Поиск по запросу: "${router.query.search}"`
                  : "Все видео"}
              </h6>
            </div>
          </div>
          {videos.length > 0 &&
            videos.map((video) => (
              <div key={video._id} className="col-xl-3 col-sm-6 mb-3">
                <div
                  className="video-card"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(video._id, "videos");
                  }}
                >
                  <div className="video-card-image">
                    <a className="play-icon" href="#">
                      <i className="fas fa-play-circle"></i>
                    </a>
                    <a href="#">
                      <img className="img-fluid" src={video.thumbnail} alt="" />
                    </a>
                    <div className="time">{video.duration}</div>
                  </div>
                  <div className="video-card-body">
                    <div
                      className="video-title"
                      data-placement="bottom"
                      data-toggle="tooltip"
                      data-original-title={video.title}
                    >
                      <a href="#">{video.title}</a>
                    </div>
                    <div
                      className="video-page text-success"
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo(video.author._id, "authors");
                      }}
                    >
                      {`${video.author.lastname} ${video.author.firstname}`}{" "}
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        data-original-title="Верифицирован"
                        href="#"
                      >
                        <i className="fas fa-check-circle text-success"></i>
                      </a>
                    </div>
                    <div className="video-view d-flex align-items-center justify-content-between">
                      <div>
                        Просмотров: {video.viewCount} &nbsp;
                        <i className="fas fa-calendar-alt"></i>{" "}
                        {moment(video.createdAt).fromNow()}
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(video._id);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {videos.length > 0 && (
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center pagination-sm mb-4">
              <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
                <Link
                  className="page-link"
                  href={`/videos?page=${page - 1}${searchQuery}`}
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
                    href={`/videos?page=${number}${searchQuery}`}
                  >
                    {number}
                  </Link>
                </li>
              ))}
              <li
                className={`page-item ${page >= pageNumbers ? "disabled" : ""}`}
              >
                <Link
                  className="page-link"
                  href={`/videos?page=${page + 1}${searchQuery}`}
                >
                  Следующий
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { page, search } = ctx.query;

  const searchQuery = search ? `&search=${search}` : "";

  const res = await fetch(
    `${appUrl}:${serverPort}/api/videos?page=${page || 1}${searchQuery}`
  );
  let result = await res.json();

  return {
    props: {
      videos: result.data.videos,
      totalCount: result.data.count,
    },
  };
}
