import React from 'react';
import { useEffect ,useState } from 'react';
import fotoMain from '../../img/tremHome.png';
import "../../css/Home.css";


function Home() {
    return <div>
       
    <main>
        <section className="hero">
            <img src={fotoMain} alt="Foto página oficial Edenz, trilho cor preta"></img>
        </section>
        <section className="content">
            <div className="content-box">
                <h2>Edenz</h2>
                <p>Movendo o mundo por trilhos.</p>
            </div>
        </section>
    </main>
    <footer>
        <p>Todos os direitos reservados © Edenz LTDA</p>
    </footer>
</div>


}

export default Home