import GetOneUser from './Profil';
import ProfilPublication from "./ProfilPost";
import '../css/Profil/Profil.css';



const Profil = () => {
    


    return(
      <>
      <div className='section_profil'>
        <div className='container_profil'>
          <div className='header_myprofil'>
            <h1 className='header_myprofil_title'>Profil</h1>
          </div>
      <GetOneUser />
      </div>
      </div>
      <ProfilPublication />
      </>
    )
}

export default Profil