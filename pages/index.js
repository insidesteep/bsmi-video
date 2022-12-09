import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/ru";
import { useEffect } from "react";
moment.locale("ru");

export default function Home({ popular, latest, isAuth }) {
  const router = useRouter();
  const goTo = (id, path) => router.push(`/${path}/${id}`);

  return (
    <div className="container-fluid pb-0">
      <div className="top-mobile-search">
        <div className="row">
          <div className="col-md-12">
            <form className="mobile-search">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="form-control"
                />
                <div className="input-group-append">
                  <button type="button" className="btn btn-dark">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <hr />
      <div className="video-block section-padding">
        <div className="row">
          <div className="col-md-12">
            <div className="main-title">
              <h6>Новые видео</h6>
            </div>
          </div>

          {latest.length &&
            latest.map((video) => (
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
                    <div className="video-title">
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
                        href="#"
                        data-original-title="Verified"
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
      </div>
      <hr />
      <div className="video-block section-padding">
        <div className="row">
          <div className="col-md-12">
            <div className="main-title">
              <h6>Популярные видео🔥</h6>
            </div>
          </div>

          {popular.length &&
            popular.map((video) => (
              <div key={video._id} className="col-xl-3 col-sm-6 mb-3">
                <div
                  className="video-card"
                  onClick={() => goTo(video._id, "videos")}
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
                    <div className="video-title">
                      <a href="#">{video.title}</a>
                    </div>
                    <div className="video-page text-success">
                      {`${video.author.lastname} ${video.author.firstname}`}{" "}
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        href="#"
                        data-original-title="Verified"
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
      </div>
      <hr className="mt-0" />
      {/* <div className="video-block section-padding">
        <div className="row">
          <div className="col-md-12">
            <div className="main-title">
              <h6>Популярные авторы</h6>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="channels-card">
              <div className="channels-card-image">
                <a href="#">
                  <img className="img-fluid" src="img/s1.png" alt="" />
                </a>
                <div className="channels-card-image-btn">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                  >
                    Subscribe <strong>1.4M</strong>
                  </button>
                </div>
              </div>
              <div className="channels-card-body">
                <div className="channels-title">
                  <a href="#">Channels Name</a>
                </div>
                <div className="channels-view">382,323 subscribers</div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="channels-card">
              <div className="channels-card-image">
                <a href="#">
                  <img className="img-fluid" src="img/s2.png" alt="" />
                </a>
                <div className="channels-card-image-btn">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                  >
                    Subscribe <strong>1.4M</strong>
                  </button>
                </div>
              </div>
              <div className="channels-card-body">
                <div className="channels-title">
                  <a href="#">Channels Name</a>
                </div>
                <div className="channels-view">382,323 subscribers</div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="channels-card">
              <div className="channels-card-image">
                <a href="#">
                  <img className="img-fluid" src="img/s3.png" alt="" />
                </a>
                <div className="channels-card-image-btn">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    Subscribed <strong>1.4M</strong>
                  </button>
                </div>
              </div>
              <div className="channels-card-body">
                <div className="channels-title">
                  <a href="#">
                    Channels Name{" "}
                    <span
                      title=""
                      data-placement="top"
                      data-toggle="tooltip"
                      data-original-title="Verified"
                    >
                      <i className="fas fa-check-circle"></i>
                    </span>
                  </a>
                </div>
                <div className="channels-view">382,323 subscribers</div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="channels-card">
              <div className="channels-card-image">
                <a href="#">
                  <img className="img-fluid" src="img/s4.png" alt="" />
                </a>
                <div className="channels-card-image-btn">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                  >
                    Subscribe <strong>1.4M</strong>
                  </button>
                </div>
              </div>
              <div className="channels-card-body">
                <div className="channels-title">
                  <a href="#">Channels Name</a>
                </div>
                <div className="channels-view">382,323 subscribers</div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`http:/localhost:3000/api/videos/home`);
  let { data } = await res.json();

  return {
    props: {
      popular: data.popular,
      latest: data.latest,
    },
  };
}
