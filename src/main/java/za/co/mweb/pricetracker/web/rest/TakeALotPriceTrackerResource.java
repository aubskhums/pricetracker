package za.co.mweb.pricetracker.web.rest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.time.ZonedDateTime;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import za.co.mweb.pricetracker.domain.TrackPriceProduct;
import za.co.mweb.pricetracker.repository.TrackPriceProductRepository;


@RestController
@RequestMapping("/api")
public class TakeALotPriceTrackerResource {

    private final Logger log = LoggerFactory.getLogger(TakeALotPriceTrackerResource.class);

    private static final String ENTITY_NAME = "buyBoxJson";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrackPriceProductRepository priceProductRepository;

    public TakeALotPriceTrackerResource(TrackPriceProductRepository priceProductRepository) {
        this.priceProductRepository = priceProductRepository;
    }

    @GetMapping("/track-takealot-prices")
    public ResponseEntity<List<TrackPriceProduct>> trackPrices() throws URISyntaxException, MalformedURLException, IOException {
        log.debug("REST request to Track Products from TakeALot");

        List<TrackPriceProduct> trackProducts = priceProductRepository.findAll();
        for(int i = 0; i < trackProducts.size(); i++){
            TrackPriceProduct trackPriceProduct = trackProducts.get(i);
            DatePrice datePrice = readDatePrice(trackPriceProduct.getpILD());
            if (datePrice != null) {
                trackProducts.get(i).setCurrentPrice(datePrice.getCurrentPrice());
                trackProducts.get(i).setDateTimePriceModified(datePrice.getDateTimePriceModified());
            }
        }
       return ResponseEntity.ok().body(trackProducts);
    }

    private DatePrice readDatePrice(String pLID) {

        DatePrice datePrice = null;

        RestTemplate restTemplate =  new RestTemplate();
        restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
        restTemplate.getMessageConverters().add(new StringHttpMessageConverter());

        String takeALotURLStr = "https://api.takealot.com/rest/v-1-9-0/product-details/" + pLID +  "?platform=desktop"; //PLID30765949

        try {

            URL url = new URL(takeALotURLStr);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-GB;     rv:1.9.2.13) Gecko/20101203 Firefox/3.6.13 (.NET CLR 3.5.30729)");
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP Error code : "
                        + conn.getResponseCode());
            }
            InputStreamReader in = new InputStreamReader(conn.getInputStream());
            BufferedReader br = new BufferedReader(in);

            StringBuilder sb = new StringBuilder();
            int cp;
            while ((cp = br.read()) != -1) {
                sb.append((char) cp);
            }

            String jsonText = sb.toString();
            JSONObject jsonObj = new JSONObject(jsonText);

/*             // System.out.println(jsonObj.get("buybox"));
            System.out.println("---------------------------------");
            System.out.println(jsonObj.getJSONObject("buybox").getNumber("listing_price"));
            System.out.println(priceArray);
 */
            JSONArray priceArray = jsonObj.getJSONObject("buybox").getJSONArray("prices");
            Float currentPrice = new Float(priceArray.getFloat(0));

            datePrice = new DatePrice();
            datePrice.setCurrentPrice(currentPrice);
            datePrice.setDateTimePriceModified(ZonedDateTime.now());

            conn.disconnect();

        } catch (Exception e) {
            System.out.println("Exception in NetClientGet:- " + e);
        }

        return datePrice;
    }

    class DatePrice {
        private Float currentPrice;
        private ZonedDateTime dateTimePriceModified;


        public DatePrice() {
        }


        public void setCurrentPrice(Float currentPrice) {
            this.currentPrice = currentPrice;
        }

        public Float getCurrentPrice() {
            return this.currentPrice;
        }

        public void setDateTimePriceModified(ZonedDateTime dateTimePriceModified) {
            this.dateTimePriceModified = dateTimePriceModified;
        }

        public ZonedDateTime getDateTimePriceModified() {
           return this.dateTimePriceModified;
        }


    }
}
