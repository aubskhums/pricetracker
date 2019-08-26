package za.co.mweb.pricetracker.service;

import za.co.mweb.pricetracker.domain.TrackPriceProduct;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link TrackPriceProduct}.
 */
public interface TrackPriceProductService {

    /**
     * Save a trackPriceProduct.
     *
     * @param trackPriceProduct the entity to save.
     * @return the persisted entity.
     */
    TrackPriceProduct save(TrackPriceProduct trackPriceProduct);

    /**
     * Get all the trackPriceProducts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TrackPriceProduct> findAll(Pageable pageable);


    /**
     * Get the "id" trackPriceProduct.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TrackPriceProduct> findOne(Long id);

    /**
     * Delete the "id" trackPriceProduct.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    void delete(String ipILDd);
}
