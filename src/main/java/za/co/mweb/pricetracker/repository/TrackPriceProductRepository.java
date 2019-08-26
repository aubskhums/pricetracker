package za.co.mweb.pricetracker.repository;

import za.co.mweb.pricetracker.domain.TrackPriceProduct;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TrackPriceProduct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrackPriceProductRepository extends JpaRepository<TrackPriceProduct, Long> {

    @Query("select tpp from TrackPriceProduct tpp where tpp.pILD = :pILD")
    List<TrackPriceProduct> findByListByPILD( @Param("pILD") String pILD);
}
