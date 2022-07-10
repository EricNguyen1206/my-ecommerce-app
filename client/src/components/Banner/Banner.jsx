import { Link } from "react-router-dom";
import { Box, Grid, Stack, styled, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import { sliderItems } from "../../data";
import PrimaryButton from "../../common/mui/components/PrimaryButton";
import { Autoplay, Navigation, Pagination } from "swiper";

const BannerSwiper = styled(Swiper)(({ theme }) => ({
    width: "100%",
    height: "100vh",
    display: "flex",
    position: "relative",
    overflow: "hidden",
    marginTop: 0,
    backgroundColor: theme.palette.background.default,
}));

const BannerGrid = styled(Grid)(({ theme }) => ({
    height: "inherit",
    backgroundColor: theme.palette.primary.light,
}));

const Left = styled(Stack)(({ theme }) => ({
    height: "100%",
    backgroundColor: theme.palette.primary.light,
}));

const Right = styled(Stack)(({ theme }) => ({
    position: "relative",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
}));

const Content = styled(Box)({
    display: "block",
    paddingLeft: 10,
});

const Banner = () => {
    return (
        <BannerSwiper
            slidesPerView={1}
            spaceBetween={30}
            slidesPerGroup={1}
            navigation={true}
            pagination={{ clickable: true }}
            speed={4000}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
                delay: 2000,
            }}
        >
            {sliderItems.map((item) => (
                <SwiperSlide key={item.id}>
                    <BannerGrid container>
                        <Grid
                            item
                            xs={0}
                            sm={4}
                            md={6}
                            lg={8}
                            sx={{ display: { xs: "none", sm: "block" } }}
                        >
                            <Left
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={0}
                            >
                                <img
                                    src={item.img}
                                    alt="banner"
                                    style={{ height: "60%" }}
                                />
                            </Left>
                        </Grid>
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                            <Right
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={0}
                            >
                                <Content>
                                    <Typography variant="h1" components="h2">
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        components="span"
                                        sx={{ marginTop: 2, marginBottom: 4 }}
                                    >
                                        {item.desc}
                                    </Typography>
                                    <Link to={`/products/new`}>
                                        <PrimaryButton>SHOP NOW</PrimaryButton>
                                    </Link>
                                </Content>
                            </Right>
                        </Grid>
                    </BannerGrid>
                </SwiperSlide>
            ))}
        </BannerSwiper>
    );
};

export default Banner;
