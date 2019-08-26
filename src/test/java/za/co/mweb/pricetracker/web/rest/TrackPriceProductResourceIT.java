package za.co.mweb.pricetracker.web.rest;

import za.co.mweb.pricetracker.PriceTrackerApp;
import za.co.mweb.pricetracker.domain.TrackPriceProduct;
import za.co.mweb.pricetracker.repository.TrackPriceProductRepository;
import za.co.mweb.pricetracker.service.TrackPriceProductService;
import za.co.mweb.pricetracker.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static za.co.mweb.pricetracker.web.rest.TestUtil.sameInstant;
import static za.co.mweb.pricetracker.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TrackPriceProductResource} REST controller.
 */
@SpringBootTest(classes = PriceTrackerApp.class)
public class TrackPriceProductResourceIT {

    private static final Float DEFAULT_CURRENT_PRICE = 1F;
    private static final Float UPDATED_CURRENT_PRICE = 2F;
    private static final Float SMALLER_CURRENT_PRICE = 1F - 1F;

    private static final ZonedDateTime DEFAULT_DATE_TIME_PRICE_MODIFIED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_TIME_PRICE_MODIFIED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_DATE_TIME_PRICE_MODIFIED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final String DEFAULT_P_ILD = "AAAAAAAAAA";
    private static final String UPDATED_P_ILD = "BBBBBBBBBB";

    @Autowired
    private TrackPriceProductRepository trackPriceProductRepository;

    @Autowired
    private TrackPriceProductService trackPriceProductService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTrackPriceProductMockMvc;

    private TrackPriceProduct trackPriceProduct;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrackPriceProductResource trackPriceProductResource = new TrackPriceProductResource(trackPriceProductService);
        this.restTrackPriceProductMockMvc = MockMvcBuilders.standaloneSetup(trackPriceProductResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrackPriceProduct createEntity(EntityManager em) {
        TrackPriceProduct trackPriceProduct = new TrackPriceProduct()
            .currentPrice(DEFAULT_CURRENT_PRICE)
            .dateTimePriceModified(DEFAULT_DATE_TIME_PRICE_MODIFIED)
            .pILD(DEFAULT_P_ILD);
        return trackPriceProduct;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrackPriceProduct createUpdatedEntity(EntityManager em) {
        TrackPriceProduct trackPriceProduct = new TrackPriceProduct()
            .currentPrice(UPDATED_CURRENT_PRICE)
            .dateTimePriceModified(UPDATED_DATE_TIME_PRICE_MODIFIED)
            .pILD(UPDATED_P_ILD);
        return trackPriceProduct;
    }

    @BeforeEach
    public void initTest() {
        trackPriceProduct = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrackPriceProduct() throws Exception {
        int databaseSizeBeforeCreate = trackPriceProductRepository.findAll().size();

        // Create the TrackPriceProduct
        restTrackPriceProductMockMvc.perform(post("/api/track-price-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trackPriceProduct)))
            .andExpect(status().isCreated());

        // Validate the TrackPriceProduct in the database
        List<TrackPriceProduct> trackPriceProductList = trackPriceProductRepository.findAll();
        assertThat(trackPriceProductList).hasSize(databaseSizeBeforeCreate + 1);
        TrackPriceProduct testTrackPriceProduct = trackPriceProductList.get(trackPriceProductList.size() - 1);
        assertThat(testTrackPriceProduct.getCurrentPrice()).isEqualTo(DEFAULT_CURRENT_PRICE);
        assertThat(testTrackPriceProduct.getDateTimePriceModified()).isEqualTo(DEFAULT_DATE_TIME_PRICE_MODIFIED);
        assertThat(testTrackPriceProduct.getpILD()).isEqualTo(DEFAULT_P_ILD);
    }

    @Test
    @Transactional
    public void createTrackPriceProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trackPriceProductRepository.findAll().size();

        // Create the TrackPriceProduct with an existing ID
        trackPriceProduct.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrackPriceProductMockMvc.perform(post("/api/track-price-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trackPriceProduct)))
            .andExpect(status().isBadRequest());

        // Validate the TrackPriceProduct in the database
        List<TrackPriceProduct> trackPriceProductList = trackPriceProductRepository.findAll();
        assertThat(trackPriceProductList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkpILDIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackPriceProductRepository.findAll().size();
        // set the field null
        trackPriceProduct.setpILD(null);

        // Create the TrackPriceProduct, which fails.

        restTrackPriceProductMockMvc.perform(post("/api/track-price-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trackPriceProduct)))
            .andExpect(status().isBadRequest());

        List<TrackPriceProduct> trackPriceProductList = trackPriceProductRepository.findAll();
        assertThat(trackPriceProductList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTrackPriceProducts() throws Exception {
        // Initialize the database
        trackPriceProductRepository.saveAndFlush(trackPriceProduct);

        // Get all the trackPriceProductList
        restTrackPriceProductMockMvc.perform(get("/api/track-price-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trackPriceProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].currentPrice").value(hasItem(DEFAULT_CURRENT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].dateTimePriceModified").value(hasItem(sameInstant(DEFAULT_DATE_TIME_PRICE_MODIFIED))))
            .andExpect(jsonPath("$.[*].pILD").value(hasItem(DEFAULT_P_ILD.toString())));
    }
    
    @Test
    @Transactional
    public void getTrackPriceProduct() throws Exception {
        // Initialize the database
        trackPriceProductRepository.saveAndFlush(trackPriceProduct);

        // Get the trackPriceProduct
        restTrackPriceProductMockMvc.perform(get("/api/track-price-products/{id}", trackPriceProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(trackPriceProduct.getId().intValue()))
            .andExpect(jsonPath("$.currentPrice").value(DEFAULT_CURRENT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.dateTimePriceModified").value(sameInstant(DEFAULT_DATE_TIME_PRICE_MODIFIED)))
            .andExpect(jsonPath("$.pILD").value(DEFAULT_P_ILD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTrackPriceProduct() throws Exception {
        // Get the trackPriceProduct
        restTrackPriceProductMockMvc.perform(get("/api/track-price-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrackPriceProduct() throws Exception {
        // Initialize the database
        trackPriceProductService.save(trackPriceProduct);

        int databaseSizeBeforeUpdate = trackPriceProductRepository.findAll().size();

        // Update the trackPriceProduct
        TrackPriceProduct updatedTrackPriceProduct = trackPriceProductRepository.findById(trackPriceProduct.getId()).get();
        // Disconnect from session so that the updates on updatedTrackPriceProduct are not directly saved in db
        em.detach(updatedTrackPriceProduct);
        updatedTrackPriceProduct
            .currentPrice(UPDATED_CURRENT_PRICE)
            .dateTimePriceModified(UPDATED_DATE_TIME_PRICE_MODIFIED)
            .pILD(UPDATED_P_ILD);

        restTrackPriceProductMockMvc.perform(put("/api/track-price-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrackPriceProduct)))
            .andExpect(status().isOk());

        // Validate the TrackPriceProduct in the database
        List<TrackPriceProduct> trackPriceProductList = trackPriceProductRepository.findAll();
        assertThat(trackPriceProductList).hasSize(databaseSizeBeforeUpdate);
        TrackPriceProduct testTrackPriceProduct = trackPriceProductList.get(trackPriceProductList.size() - 1);
        assertThat(testTrackPriceProduct.getCurrentPrice()).isEqualTo(UPDATED_CURRENT_PRICE);
        assertThat(testTrackPriceProduct.getDateTimePriceModified()).isEqualTo(UPDATED_DATE_TIME_PRICE_MODIFIED);
        assertThat(testTrackPriceProduct.getpILD()).isEqualTo(UPDATED_P_ILD);
    }

    @Test
    @Transactional
    public void updateNonExistingTrackPriceProduct() throws Exception {
        int databaseSizeBeforeUpdate = trackPriceProductRepository.findAll().size();

        // Create the TrackPriceProduct

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrackPriceProductMockMvc.perform(put("/api/track-price-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trackPriceProduct)))
            .andExpect(status().isBadRequest());

        // Validate the TrackPriceProduct in the database
        List<TrackPriceProduct> trackPriceProductList = trackPriceProductRepository.findAll();
        assertThat(trackPriceProductList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrackPriceProduct() throws Exception {
        // Initialize the database
        trackPriceProductService.save(trackPriceProduct);

        int databaseSizeBeforeDelete = trackPriceProductRepository.findAll().size();

        // Delete the trackPriceProduct
        restTrackPriceProductMockMvc.perform(delete("/api/track-price-products/{id}", trackPriceProduct.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TrackPriceProduct> trackPriceProductList = trackPriceProductRepository.findAll();
        assertThat(trackPriceProductList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrackPriceProduct.class);
        TrackPriceProduct trackPriceProduct1 = new TrackPriceProduct();
        trackPriceProduct1.setId(1L);
        TrackPriceProduct trackPriceProduct2 = new TrackPriceProduct();
        trackPriceProduct2.setId(trackPriceProduct1.getId());
        assertThat(trackPriceProduct1).isEqualTo(trackPriceProduct2);
        trackPriceProduct2.setId(2L);
        assertThat(trackPriceProduct1).isNotEqualTo(trackPriceProduct2);
        trackPriceProduct1.setId(null);
        assertThat(trackPriceProduct1).isNotEqualTo(trackPriceProduct2);
    }
}
