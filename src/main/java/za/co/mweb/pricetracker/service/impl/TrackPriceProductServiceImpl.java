package za.co.mweb.pricetracker.service.impl;

import za.co.mweb.pricetracker.service.TrackPriceProductService;
import za.co.mweb.pricetracker.domain.TrackPriceProduct;
import za.co.mweb.pricetracker.repository.TrackPriceProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link TrackPriceProduct}.
 */
@Service
@Transactional
public class TrackPriceProductServiceImpl implements TrackPriceProductService {

    private final Logger log = LoggerFactory.getLogger(TrackPriceProductServiceImpl.class);

    private final TrackPriceProductRepository trackPriceProductRepository;

    public TrackPriceProductServiceImpl(TrackPriceProductRepository trackPriceProductRepository) {
        this.trackPriceProductRepository = trackPriceProductRepository;
    }

    /**
     * Save a trackPriceProduct.
     *
     * @param trackPriceProduct the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TrackPriceProduct save(TrackPriceProduct trackPriceProduct) {
        log.debug("Request to save TrackPriceProduct : {}", trackPriceProduct);
        return trackPriceProductRepository.save(trackPriceProduct);
    }

    /**
     * Get all the trackPriceProducts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TrackPriceProduct> findAll(Pageable pageable) {
        log.debug("Request to get all TrackPriceProducts");
        return trackPriceProductRepository.findAll(pageable);
    }


    /**
     * Get one trackPriceProduct by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TrackPriceProduct> findOne(Long id) {
        log.debug("Request to get TrackPriceProduct : {}", id);
        return trackPriceProductRepository.findById(id);
    }

    /**
     * Delete the trackPriceProduct by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TrackPriceProduct : {}", id);
        trackPriceProductRepository.deleteById(id);
    }

    @Override
    public void delete(String pILD) {
        List<TrackPriceProduct> trackProducts = trackPriceProductRepository.findByListByPILD(pILD);

        for(TrackPriceProduct trackPriceProduct:trackProducts){
            trackPriceProductRepository.deleteById(trackPriceProduct.getId());
        }
    }
}
