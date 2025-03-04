import supertest from "supertest";
import { expect } from "chai";
const requester = supertest("http://localhost:8080");

describe("Testing de la app web Adoptame", () => {
    describe("Testing de Adopciones", () => {
        it("Endpoint GET /api/adoptions debe traer todas las mascotas", async () => {

            const { status, _body } = await requester.get("/api/adoptions")

            expect(status).to.equal(200);
            expect(_body.payload).to.be.an("array");
        })

        it("Debe retornar 404 si la ruta no existe", async () => {
            const {status} = await requester.get("/api/adoption/noexiste")

            expect(status).to.equal(404);
        })

        it("Traemos una adopcion por ID", async () =>{
            let idAdoption = "67c61f2f5120f2749d9b63fe";

            const {status, _body} = await requester.get(`/api/adoptions/${idAdoption}`);  

            expect(status).to.equal(200);
            expect(_body.payload).to.have.property("_id").that.equals(idAdoption);
        })

        it("creamos una adopcion", async () => {
            let uid = "679599d1a072a34533719b9a";
            let pid = "679599d2a072a34533719bc0";

            const {status} = await requester.post(`/api/adoptions/${uid}/${pid}`);

            expect(status).to.equal(200);
        })
    })
})
