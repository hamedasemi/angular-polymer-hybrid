/**All tests should be here 
 * coverage should be included
 * @author Apegroup
 */

import { describe, it } from 'mocha'
import assert from 'assert'
import http, { get } from 'http'


/**
* ======================================================================
* Test 1 check the server 
* ======================================================================
*/
describe(`test mocha with http`, () => {
    it(`should return OK 200`, (done) => {
        get(`http://localhost:8080`, (res) => {
            assert.equal(200, res.statusCode)
            done()
        })
    })
})
/**
* ======================================================================
* Test 2 check the body content  in about  
* ======================================================================
*/
describe(`/about`, () => {
    it(`the body content should be "Some Data" `, (done) => {
        get(`http://localhost:8080/about`, (res) => {
            var data = ``
            res.on(`data`, (chunk) => {
                data += chunk
            })
            res.on(`end`, () => {
                assert.equal(`Hi About Page`, data)
                done()
            })

        })
    })
})
/**
* ======================================================================
* Test 3 check if the server status  
* ======================================================================
*/

describe(`check the header`, () => {
    it(`should return 200 in case of test/plain headers `, (done) => {
        let option = {
            url: `http://localhost:8080/about`,

            headers: {
                'Content-Type': `text/plain`
            }
        }
        get(option, (err) => {
            assert.equal(200, res.statusCode)
            // assert.equal(res.body,headers)
            done()
        })
    })
})