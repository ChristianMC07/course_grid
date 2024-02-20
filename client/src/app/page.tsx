import Link from "next/link";
import Hero from "./components/hero";
import homeImg from "@/../public/images/homeImg.jpg"

export default function Home() {

  return (
    <>
      <Hero
        imgData={homeImg}
        imgAlt="Teacher organizing their notes in a planner board"
        title="Improve you class management using our wonderfull App"
      />
    </>
  )

}