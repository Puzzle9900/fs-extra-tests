const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const fs = require("fs-extra");
chai.use(chaiAsPromised)

const expect = chai.expect;
const assert = chai.assert;


describe("#TestingFS-Extra", ()=>{
    let test_file = './test_file.txt';

    it("File should exists",async ()=>{
        let exists = await fs.exists(test_file);

        expect(exists).to.be.equal(true);
    });

    it("File size should be 18",async ()=>{
        let stat = await fs.stat(test_file);

        expect(stat.size).is.equals(18);
    });

    it('First character of file should be "h"',async ()=>{
            let startReading = 0;

            let fd = await fs.open(test_file, 'r');

            const {bytesRead, buffer} = await fs.read(fd, Buffer.alloc(1) , 0, 1, 0);

            let char = String.fromCharCode(buffer[0]);

            expect(char).to.be.equals('h');
    }); 

    it('Last character of file should be "u"',async ()=>{
            let startReading = 0;

            let fd = await fs.open(test_file, 'r');

            let stat = await fs.stat(test_file);

            const {bytesRead, buffer} = await fs.read(fd, Buffer.alloc(1) , 0, 1, stat.size - 1);

            let char = String.fromCharCode(buffer[0]);

            expect(char).to.be.equals('u');
    });
});