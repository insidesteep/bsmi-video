import Image from "next/image";
import Link from "next/link";

export default function Custom404({}) {
  return (
    <div className="container-fluid pb-0">
      <div className="row">
        <div className="col-md-8 mx-auto text-center  pt-4 pb-5">
          <h1>
            <img alt="404" src="/img/404.png" className="img-fluid" />
          </h1>
          <h1>Страница не найдена.</h1>
          <p className="land">
            К сожалению, страница, которую вы ищете, была перемещена или
            удалена.
          </p>
          <div className="mt-5">
            <Link className="btn btn-outline-primary" href="/">
              <i className="mdi mdi-home"></i> На главную страницу
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
