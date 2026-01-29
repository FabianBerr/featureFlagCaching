const cds = require('@sap/cds');
const axios = require('axios');
const xsenv = require("@sap/xsenv");
xsenv.loadEnv();

cds.middlewares.add(async function featureToggleMiddleware(req, _, next) {

    console.log(cds.env.profiles);
    aFeatures = [];
    if (cds.env.profiles.includes('production')) {
        if (cds.context.tenant === "002d05a8-0727-4da4-ab38-a31671726bc1" || cds.context.tenant === "tenant2") {

            const services = xsenv.getServices({
                featureflags: { tag: "feature-flags" }
            });

            const oFeatureFlagResponse = await axios({
                method: 'get',
                url: `${services.featureflags.uri}/api/v1/features/export`,
                headers: {
                    "Authorization": `Basic ${Buffer.from(`${services.featureflags.username}:${services.featureflags.password}`).toString("base64")}`
                }
            });

            if (oFeatureFlagResponse.data?.flags) {
                aFeatures = oFeatureFlagResponse.data.flags.filter(obj => obj.enabled).map(obj => obj.id);
            }
        }
        req.features = aFeatures;
    }
    next();
}, { before: 'ctx_model' });
