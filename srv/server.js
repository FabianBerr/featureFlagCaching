const cds = require("@sap/cds");
const axios = require("axios");
const xsenv = require("@sap/xsenv");
xsenv.loadEnv();

cds.middlewares.add(
    async function featureToggleMiddleware(req, _, next) {
        console.log(cds.env.profiles);
        aFeatures = [];
        //if (cds.env.profiles.includes('production')) {
        // if (cds.context.tenant === "002d05a8-0727-4da4-ab38-a31671726bc1" || cds.context.tenant === "tenant2") {

        const services = xsenv.getServices({
            featureflags: { tag: "feature-flags" },
        });

        const cache = await cds.connect.to("caching");
        let oCachedFeatures = await cache.get("enabledFeatures");
        if (!oCachedFeatures) {
            const oFeatureFlagResponse = await fetch(`${services.featureflags.uri}/api/v1/features/export`,{
                method: "GET",              
                headers: {
                    Authorization: `Basic ${Buffer.from(`${services.featureflags.username}:${services.featureflags.password}`).toString("base64")}`,
                },
            });

            
            if (!oFeatureFlagResponse.ok) {
                throw new Error(`Feature flag request failed with status ${oFeatureFlagResponse.status}`);
            }

             const oFeatureFlagData = await oFeatureFlagResponse.json();

            if (oFeatureFlagData?.flags) {
                aFeatures = oFeatureFlagData.flags
                    .filter((obj) => obj.enabled)
                    .map((obj) => obj.id);
            }
            cache.set("enabledFeatures", aFeatures, { ttl: 60000 }); // cache for 1 minute
        }
        else {
            aFeatures = oCachedFeatures;
        }

        // }
        req.features = aFeatures;
        //}
        next();
    },
    { before: "ctx_model" },
);
