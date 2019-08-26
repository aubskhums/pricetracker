package za.co.mweb.pricetracker.web.rest;

import za.co.mweb.pricetracker.domain.TrackPriceProduct;
import za.co.mweb.pricetracker.service.TrackPriceProductService;
import za.co.mweb.pricetracker.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link za.co.mweb.pricetracker.domain.TrackPriceProduct}.
 */
@RestController
@RequestMapping("/api")
public class TrackPriceProductResource {

    private final Logger log = LoggerFactory.getLogger(TrackPriceProductResource.class);

    private static final String ENTITY_NAME = "trackPriceProduct";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrackPriceProductService trackPriceProductService;

    public TrackPriceProductResource(TrackPriceProductService trackPriceProductService) {
        this.trackPriceProductService = trackPriceProductService;
    }

    /**
     * {@code POST  /track-price-products} : Create a new trackPriceProduct.
     *
     * @param trackPriceProduct the trackPriceProduct to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trackPriceProduct, or with status {@code 400 (Bad Request)} if the trackPriceProduct has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/track-price-products")
    public ResponseEntity<TrackPriceProduct> createTrackPriceProduct(@Valid @RequestBody TrackPriceProduct trackPriceProduct) throws URISyntaxException {
        log.debug("REST request to save TrackPriceProduct : {}", trackPriceProduct);
        if (trackPriceProduct.getId() != null) {
            throw new BadRequestAlertException("A new trackPriceProduct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TrackPriceProduct result = trackPriceProductService.save(trackPriceProduct);
        return ResponseEntity.created(new URI("/api/track-price-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("/track-price-products/{pILD}")
    public ResponseEntity<TrackPriceProduct> createTrackPriceProduct(@PathVariable String pILD) throws URISyntaxException {
        log.debug("REST request to save TrackPriceProduct with pILD : {pILD}", pILD);

        TrackPriceProduct trackPriceProduct = new TrackPriceProduct();
        trackPriceProduct.setpILD(pILD);

        TrackPriceProduct result = trackPriceProductService.save(trackPriceProduct);
        return ResponseEntity.created(new URI("/api/track-price-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }



    /**
     * {@code PUT  /track-price-products} : Updates an existing trackPriceProduct.
     *
     * @param trackPriceProduct the trackPriceProduct to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trackPriceProduct,
     * or with status {@code 400 (Bad Request)} if the trackPriceProduct is not valid,
     * or with status {@code 500 (Internal Server Error)} if the trackPriceProduct couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/track-price-products")
    public ResponseEntity<TrackPriceProduct> updateTrackPriceProduct(@Valid @RequestBody TrackPriceProduct trackPriceProduct) throws URISyntaxException {
        log.debug("REST request to update TrackPriceProduct : {}", trackPriceProduct);
        if (trackPriceProduct.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TrackPriceProduct result = trackPriceProductService.save(trackPriceProduct);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, trackPriceProduct.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /track-price-products} : get all the trackPriceProducts.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of trackPriceProducts in body.
     */
    @GetMapping("/track-price-products")
    public ResponseEntity<List<TrackPriceProduct>> getAllTrackPriceProducts(Pageable pageable) {
        log.debug("REST request to get a page of TrackPriceProducts");
        Page<TrackPriceProduct> page = trackPriceProductService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /track-price-products/:id} : get the "id" trackPriceProduct.
     *
     * @param id the id of the trackPriceProduct to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trackPriceProduct, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/track-price-products/{id}")
    public ResponseEntity<TrackPriceProduct> getTrackPriceProduct(@PathVariable Long id) {
        log.debug("REST request to get TrackPriceProduct : {}", id);
        Optional<TrackPriceProduct> trackPriceProduct = trackPriceProductService.findOne(id);
        return ResponseUtil.wrapOrNotFound(trackPriceProduct);
    }

    /**
     * {@code DELETE  /track-price-products/:id} : delete the "id" trackPriceProduct.
     *
     * @param id the id of the trackPriceProduct to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/track-price-products/{id}")
    public ResponseEntity<Void> deleteTrackPriceProduct(@PathVariable Long id) {
        log.debug("REST request to delete TrackPriceProduct : {}", id);
        trackPriceProductService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }


    @DeleteMapping("/track-price-products/pILD/{pILD}")
    public ResponseEntity<Void> deleteTrackPriceProduct(@PathVariable String pILD) {
        log.debug("REST request to delete TrackPriceProduct with pILD : {}", pILD);
        trackPriceProductService.delete(pILD);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, "")).build();
    }
}
