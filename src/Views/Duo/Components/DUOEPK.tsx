import Header from "../Components/Header";
import Bio from "../Components/Bio";
import PhotoGallery from "../Components/PhotoGallery";
import Listen from "./Listen";
import Nav from "../../../Components/Nav/Nav";

export default function DUOEPK() {

  return (
    <div className="wifeIslandMainDiv">
      <Nav />
      <Header />
      <main className="">
       <Bio />
       <Listen />
       <PhotoGallery />
      </main>
    </div>
  );
}
