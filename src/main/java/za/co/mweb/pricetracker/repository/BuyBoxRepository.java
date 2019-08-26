package za.co.mweb.pricetracker.repository;

import za.co.mweb.pricetracker.domain.BuyBox;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BuyBox entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BuyBoxRepository extends JpaRepository<BuyBox, Long> {

}
