import http from 'http';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';


//funccao generator, "nao espera eu processar essa fucnao inteira", a medida que 
function* run() {

    for (let index = 0; index <= 99; index++) {
        const data = {
            id: randomUUID(),
            name: `Dado-${index}`
        }
        yield data
        //cada vez que chamar o yeld ele manda oq ue tiver na memoria
        // yeald so funcioan de a funcao tiver um asterisco *
    }

} 



async function handler(request, response) {

    const readable = new Readable({
        read() {
            //a medida que o run retona data para mim
            for (const data of run()) {

                //retorna isto
                console.log(`sending`, data)

                //cada vez que chamar ele evia tudo para o pipe la em baixo
                this.push(JSON.stringify(data) + "\n")
            }


            //para imformar que os dados do readable acabaram
            this.push(null)
            //para infromar que tem dados é this.push(qquerCoisa)
            //o upload da streanm sera implementado no request
        }
    })
    readable.pipe(response)
}




http.createSercer(handler)
    .listen(3000)
    .on('listening', () => console.log('server running 3000'))
