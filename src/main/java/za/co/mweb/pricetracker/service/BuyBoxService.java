package za.co.mweb.pricetracker.service;

import za.co.mweb.pricetracker.domain.BuyBox;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link BuyBox}.
 */
public interface BuyBoxService {

    /**
     * Save a buyBox.
     *
     * @param buyBox the entity to save.
     * @return the persisted entity.
     */
    BuyBox save(BuyBox buyBox);

    /**
     * Get all the buyBoxes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BuyBox> findAll(Pageable pageable);


    /**
     * Get the "id" buyBox.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BuyBox> findOne(Long id);

    /**
     * Delete the "id" buyBox.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
