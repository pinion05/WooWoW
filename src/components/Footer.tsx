import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <>
      <p className="text-center text-xs">
        <a href="https://github.com/pinion05/shalompmc0505">
          <i className="fab fa-github"></i>
        </a>
        <p>https://github.com/pinion05</p>
        <p>shalompmc0505@naver.com</p>
        <p>
          Copyright 2023~ ALL Rights{" "}
          <Link
            className="cursor-text"
            href={"/2946f0a8-8875-480d-b655-f6b6e31d02f4"}
          >
            Reserved
          </Link>
          .
        </p>
      </p>
    </>
  );
}
