package za.co.mweb.pricetracker.service.impl;

import za.co.mweb.pricetracker.service.BuyBoxService;
import za.co.mweb.pricetracker.domain.BuyBox;
import za.co.mweb.pricetracker.repository.BuyBoxRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link BuyBox}.
 */
@Service
@Transactional
public class BuyBoxServiceImpl implements BuyBoxService {

    private final Logger log = LoggerFactory.getLogger(BuyBoxServiceImpl.class);

    private final BuyBoxRepository buyBoxRepository;

    public BuyBoxServiceImpl(BuyBoxRepository buyBoxRepository) {
        this.buyBoxRepository = buyBoxRepository;
    }

    /**
     * Save a buyBox.
     *
     * @param buyBox the entity to save.
     * @return the persisted entity.
     */
    @Override
    public BuyBox save(BuyBox buyBox) {
        log.debug("Request to save BuyBox : {}", buyBox);
        return buyBoxRepository.save(buyBox);
    }

    /**
     * Get all the buyBoxes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BuyBox> findAll(Pageable pageable) {
        log.debug("Request to get all BuyBoxes");
        return buyBoxRepository.findAll(pageable);
    }


    /**
     * Get one buyBox by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BuyBox> findOne(Long id) {
        log.debug("Request to get BuyBox : {}", id);
        return buyBoxRepository.findById(id);
    }

    /**
     * Delete the buyBox by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BuyBox : {}", id);
        buyBoxRepository.deleteById(id);
    }
}
