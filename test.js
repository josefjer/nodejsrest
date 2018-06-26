const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('.');

chai.use(chaiHttp);

const { expect } = chai;

describe('REST API test', () => {
    after((done) => {
        server.close(done);
    });
  // here we put our tests
});
it('should test 404 error', async () => {
    let isTestFinished = false;

    await chai.request(server)
        .get('/')
        .send()
        .catch((err) => {
            expect(err).to.have.status(404);
            isTestFinished = true;
        });

    expect(isTestFinished).is.true;
});