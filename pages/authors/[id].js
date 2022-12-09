import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import "moment/locale/ru";

import config from "../../config/config";

const { appUrl, serverPort } = config;

moment.locale("ru");

export default function Videos({
  videos,
  totalCount,
  itemPerPage = 12,

  authorData,
}) {
  const [page, setPage] = useState(1);
  const router = useRouter();

  console.log(authorData, totalCount);

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

  const goTo = (id) => router.push(`/videos/${id}`);

  return (
    <div className="container-fluid pb-0">
      <div className="channels-card">
        <div className="channels-card-image">
          <img className="img-fluid" src="/img/user.webp" alt="" />
        </div>
        <div className="channels-card-body">
          <div className="channels-title text-success">
            {`${authorData.lastname} ${authorData.firstname} ${authorData.patronymic}`}{" "}
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
        </div>
        <div className="channels-view">382,323 видео</div>
      </div>
      <hr />
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
                  Sort by{" "}
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-fw fa-star"></i> &nbsp; Top Rated
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-fw fa-signal"></i> &nbsp; Viewed
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-fw fa-times-circle"></i> &nbsp; Close
                  </a>
                </div>
              </div>
              <h6>Видео автора</h6>
            </div>
          </div>
          {videos.length > 0 &&
            videos.map((video) => (
              <div key={video._id} className="col-xl-3 col-sm-6 mb-3">
                <div className="video-card" onClick={() => goTo(video._id)}>
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
                    <div className="video-page text-success">
                      {`${video.author.lastname} ${video.author.firstname}`}
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
                    <div className="video-view">
                      Просмотров: {video.viewCount} &nbsp;
                      <i className="fas fa-calendar-alt"></i>{" "}
                      {moment(video.createdAt).fromNow()}
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
                  href={`/authors/${authorData._id}?page=${
                    page - 1
                  }${searchQuery}`}
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
                    href={`/authors/${authorData._id}?page=${number}${searchQuery}`}
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
                  href={`/authors/${authorData._id}?page=${
                    page + 1
                  }${searchQuery}`}
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
  const { page, search, id } = ctx.query;

  console.log(ctx);

  const searchQuery = search ? `&search=${search}` : "";

  const resUser = await fetch(`${appUrl}:${serverPort}/api/authors/${id}`);

  const resVideos = await fetch(
    `${appUrl}:${serverPort}/api/videos/author/${id}/?page=${
      page || 1
    }${searchQuery}`
  );
  let result1 = await resVideos.json();
  let result2 = await resUser.json();

  return {
    props: {
      videos: result1.data.videos,
      totalCount: result1.data.count,
      authorData: result2.data,
    },
  };
}
