import React from "react";
import { Box, Button, Typography, Chip, Divider } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CategoryIcon from '@mui/icons-material/Category';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BadgeIcon from '@mui/icons-material/Badge';
import { useNavigate } from "react-router-dom";

const ServiceProviderCard = ({ 
  id, 
  name, 
  surname, 
  location, 
  price, 
  imageUrl, 
  rating = 5, 
  category, 
  gender, 
  age, 
  village = 'N/A', 
  city = 'N/A', 
  categoryType,
  // Car details - new props for moving and bathroom categories
  carId,
  carBrand,
  carModel,
  licensePlate,
  carImageUrl
}) => {
  const navigate = useNavigate();

  // Determine if this is a car-based service (moving or bathroom)
  const isCarService = categoryType === 'moving' || categoryType === 'bathroom';

  // Format price to have commas
  const formatPrice = (price) => {
    if (!price && price !== 0) return "N/A";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " KIP";
  };

  // Handle click to navigate to service detail page
  const handleCardClick = () => {
    navigate(`/service-detail/${id}`);
  };

  // Ensure rating is a valid number between 0-5
  const safeRating = Number.isInteger(rating) && rating >= 0 && rating <= 5 ? rating : 5;

  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid #eee',
        borderRadius: 2,
        overflow: 'hidden',
        mb: 3,
        boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0px 6px 12px rgba(0,0,0,0.1)'
        },
        cursor: 'pointer'
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ height: 200, overflow: 'hidden' }}>
        {/* Show car image for moving/bathroom services, otherwise show employee image */}
        <img 
          src={isCarService ? (carImageUrl || '/api/placeholder/400/300') : (imageUrl || '/api/placeholder/400/300')} 
          alt={isCarService ? `${carBrand || 'Car'} ${carModel || ''}` : (name || 'Service Provider')} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          onError={(e) => {
            e.target.src = '/api/placeholder/400/300';
          }}
        />
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{name || 'N/A'} {surname || ''}</Typography>
          <Box sx={{ display: 'flex' }}>
            {[...Array(safeRating)].map((_, i) => (
              <StarIcon key={i} sx={{ fontSize: 16, color: '#FFD700' }} />
            ))}
          </Box>
        </Box>

        {/* Category and gender/age info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, mb: 0.5 }}>
            <CategoryIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">{category || 'N/A'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {gender || 'N/A'}, {age || 'N/A'} ປີ
            </Typography>
          </Box>
        </Box>

        {/* Car details for moving/bathroom services */}
        {isCarService && (
          <Box 
            sx={{
              mb: 2,
              p: 1.5,
              backgroundColor: '#f5f7ff',
              borderRadius: 1,
              border: '1px dashed rgba(97, 20, 99, 0.2)'
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1, color: '#611463', fontWeight: 600 }}>
              ຂໍ້ມູນລົດ
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <DirectionsCarIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                {carBrand || 'Toyota'} {carModel || 'Hilux'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <BadgeIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {licensePlate || 'N/A'}
              </Typography>
              {carId && (
                <Chip 
                  size="small" 
                  label={`ລະຫັດລົດ: ${carId}`} 
                  sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                />
              )}
            </Box>
          </Box>
        )}

        {/* Location info */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          p: 1,
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, mb: { xs: 0.5, sm: 0 }, minWidth: '45%' }}>
            <HomeIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">{village}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationCityIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">{city}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="h6" color="warning.main" sx={{ mb: 2 }}>{formatPrice(price)}</Typography>
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/service-detail/${id}`);
          }}
          fullWidth
          sx={{
            bgcolor: '#611463',
            '&:hover': { bgcolor: '#611463' },
            textTransform: 'none',
            borderRadius: 10
          }}
        >
          ເບິ່ງລາຍລະອຽດ
        </Button>
      </Box>
    </Box>
  );
};

export default ServiceProviderCard;