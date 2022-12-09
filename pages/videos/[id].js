import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ru";

import config from "../../config/config";

const { appUrl, serverPort } = config;

moment.locale("ru");

export default function VideoDetail({ data }) {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const { id: videoId } = router.query;

  const goTo = (id) => router.push(`/videos/${id}`);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const onCopy = () => navigator.clipboard.writeText(url);

  const incrementViewCount = async () => {
    try {
      await fetch(`${appUrl}:${serverPort}/api/videos/viewcount`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId }),
        method: "POST",
      });
    } catch (error) {
      console.error("Ошибка", error);
    }
  };
  useEffect(() => {
    incrementViewCount();
  }, []);

  return (
    <div className="container-fluid pb-0">
      <div className="video-block section-padding">
        <div className="row">
          <div className="col-md-8">
            <div className="single-video-left">
              <div className="single-video">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube-nocookie.com/embed/${data.video.youtubeId}?rel=0&amp;controls=1&amp;showinfo=1&modestbranding=1`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="single-video-title box mb-3">
                <h2>
                  <a href="#">{data.video.title}</a>
                </h2>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0">
                    <i className="fas fa-eye"></i>{" "}
                    {data.video.viewCount.toLocaleString()} просмотров
                  </p>
                  <button
                    className="mb-0 btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <i className="fas fa-share"></i> Поделиться
                  </button>
                </div>
              </div>
              <div className="single-video-author box mb-3">
                {/* <div className="float-right">
                  <button className="btn btn-danger" type="button">
                    Subscribe <strong>1.4M</strong>
                  </button>{" "}
                  <button className="btn btn btn-outline-danger" type="button">
                    <i className="fas fa-bell"></i>
                  </button>
                </div> */}
                <img className="img-fluid" src="/img/s4.png" alt="" />
                <p>
                  <a href="#">
                    <strong>{`${data.video.author.lastname} ${data.video.author.firstname} ${data.video.author.patronymic}`}</strong>
                  </a>{" "}
                  <span
                    title=""
                    data-placement="top"
                    data-toggle="tooltip"
                    data-original-title="Verified"
                  >
                    <i className="fas fa-check-circle text-success"></i>
                  </span>
                </p>
                <small>
                  Опубликовано: {moment(data.video.createAt).format("LL")}
                </small>
              </div>
              <div className="single-video-info-content box mb-3">
                <h6>Категория :</h6>
                <p>{data.video.category.name}</p>
                <h6>Описание :</h6>
                <p>{data.video.description} </p>
                {/* <h6>Tags :</h6>
                <p className="tags mb-0">
                  <span>
                    <a href="#">Uncharted 4</a>
                  </span>
                  <span>
                    <a href="#">Playstation 4</a>
                  </span>
                  <span>
                    <a href="#">Gameplay</a>
                  </span>
                  <span>
                    <a href="#">1080P</a>
                  </span>
                  <span>
                    <a href="#">ps4Share</a>
                  </span>
                  <span>
                    <a href="#">+ 6</a>
                  </span>
                </p> */}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="single-video-right">
              <div className="row">
                <div className="col-md-12">
                  <div className="main-title">
                    {/* <div className="btn-group float-right right-action">
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
                          <i className="fas fa-fw fa-times-circle"></i> &nbsp;
                          Close
                        </a>
                      </div>
                    </div> */}
                    <h6>Другие видео автора</h6>
                  </div>
                </div>
                <div className="col-md-12">
                  {data.otherVideos.map((ov) => (
                    <div
                      className="video-card video-card-list"
                      key={ov._id}
                      onClick={() => goTo(ov._id)}
                    >
                      <div className="video-card-image">
                        <a className="play-icon" href="#">
                          <i className="fas fa-play-circle"></i>
                        </a>
                        <a href="#">
                          <img
                            className="img-fluid"
                            src={ov.thumbnail}
                            alt=""
                          />
                        </a>
                        <div className="time">{ov.duration}</div>
                      </div>
                      <div className="video-card-body">
                        <div className="btn-group float-right right-action">
                          <a
                            href="#"
                            className="right-action-link text-gray"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i
                              className="fa fa-ellipsis-v"
                              aria-hidden="true"
                            ></i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#">
                              <i className="fas fa-fw fa-star"></i> &nbsp; Top
                              Rated
                            </a>
                            <a className="dropdown-item" href="#">
                              <i className="fas fa-fw fa-signal"></i> &nbsp;
                              Viewed
                            </a>
                            <a className="dropdown-item" href="#">
                              <i className="fas fa-fw fa-times-circle"></i>{" "}
                              &nbsp; Close
                            </a>
                          </div>
                        </div>
                        <div className="video-title">
                          <a href="#">{ov.title}</a>
                        </div>
                        <div className="video-page text-success">
                          {`${ov.author.lastname} ${ov.author.firstname} ${ov.author.patronymic}`}{" "}
                          <a
                            title=""
                            data-placement="top"
                            data-toggle="tooltip"
                            href="#"
                            data-original-title="Верифицирован"
                          >
                            <i className="fas fa-check-circle text-success"></i>
                          </a>
                        </div>
                        <div className="video-view">
                          {ov.viewCount} просмотров &nbsp;
                          <i className="fas fa-calendar-alt"></i>{" "}
                          {moment(ov.createdAt).fromNow()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">Поделиться</div>
            <div className="modal-body">
              <div className="d-flex align-items-center">
                <input className="form-control" readOnly value={url} />
                <button className="btn btn-primary btn-sm" onClick={onCopy}>
                  Копировать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const res = await fetch(`${appUrl}:${serverPort}/api/videos/${params.id}`);
  let data = await res.json();

  return {
    props: {
      data: data.data,
    },
  };
}
