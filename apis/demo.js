module.exports = (route) => {
    route.get("/demo", async (req, res, next) => {
        try {
            const { pool } = req;
            const [resData, fields] = await pool.query(`SELECT * FROM req_resp`);
            res.send({ data: resData })
        } catch (err) {
            next(err)
        }
    })
    route.post("/demo", async (req, res, next) => {
        try {
            const { pool, body } = req;
            console.log("body : ", body)
            if (!body.link || !body.ip) {
                next({ status: 400, message: "bad Request" })
            } else {
                const [resData, fields] = await pool.query(`INSERT INTO req_resp (link,ip,env,gps,member,zone,ts,event,action,data,ts_Close,actives,response_Data) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`, [body.link, body.ip, body.env || null, body.gps || '', body.member || null, body.zone || null, body.ts || null, body.event || null, body.action || null, body.data || '', body.ts_Close || null, body.actives || 0, body.response_Data || '']);
                let response = 0
                const [spRessponse, spFields] = await pool.query(`CALL reqresp_srv(?,@response); SELECT @response;`, resData.insertId);
                console.log("spRessponse : ", spRessponse[1][0]['@response'])
                res.send({ data: JSON.parse(spRessponse[1][0]['@response']) })
            }
        } catch (err) {
            console.log("error : ", err)
            next(err)
        }
    })
    route.put("/demo/:id", (req, res, next) => {
        res.send({ data: "hello world" })
    })
}