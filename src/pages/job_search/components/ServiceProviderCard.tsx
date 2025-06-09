import React from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CategoryIcon from '@mui/icons-material/Category';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BadgeIcon from '@mui/icons-material/Badge';
import { useNavigate } from "react-router-dom";

interface ServiceProviderCardProps {
  id: string | number;
  name?: string;
  surname?: string;
  price?: number;
  imageUrl?: string;
  rating?: number;
  category?: string;
  gender?: string;
  address?: string;
  city?: string;
  cat_id?: number; // Category ID to determine if car details should be shown
  // Car details
  carId?: string;
  carBrand?: string;
  carModel?: string;
  licensePlate?: string;
}

const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({ 
  id, 
  name, 
  surname, 
  price, 
  imageUrl, 
  rating = 5, 
  category, 
  gender, 
  address, 
  city,
  cat_id, // Added category ID
  // Car details
  carId,
  carBrand,
  carModel,
  licensePlate,
}) => {
  const navigate = useNavigate();

  // Show car details only if category ID is 5 and we have car data
  const showCarDetails = cat_id === 5 && !!carId;
  
  // Debug info
  console.log(`Card ${id}: cat_id=${cat_id}, showCarDetails=${showCarDetails}, carId=${carId}, rating=${rating}`);
  if (showCarDetails) {
    console.log(`Car details for ${id}: Brand=${carBrand}, Model=${carModel}, Plate=${licensePlate}`);
  }

  // Format price to have commas
  const formatPrice = (price?: number): string => {
    if (price === undefined || price === null) return "N/A";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ກີບ";
  };

  const handleCardClick = (): void => {
    navigate(`/service-detail/${id}`);
  };

  // Enhanced rating validation and processing
  const safeRating: number = (() => {
    // Convert rating to number if it's a string
    const numRating = typeof rating === 'string' ? parseFloat(rating) : rating;
    
    // Validate rating is a valid number between 1 and 5
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      console.warn(`Invalid rating ${rating} for employee ${id}, defaulting to 5`);
      return 5;
    }
    
    // Round to nearest integer for star display
    return Math.round(numRating);
  })();

  // Helper function to render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Box key={i} sx={{ position: 'relative', display: 'inline-block' }}>
          {i <= safeRating ? (
            <StarIcon sx={{ 
              fontSize: 16, 
              color: '#FFD700',
              filter: 'drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3))'
            }} />
          ) : (
            <StarOutlineIcon sx={{ 
              fontSize: 16, 
              color: '#E0E0E0',
              opacity: 0.6
            }} />
          )}
        </Box>
      );
    }
    return stars;
  };

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
        <img 
          src={imageUrl || '/api/placeholder/400/300'} 
          alt={name || 'Service Provider'} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{name || 'N/A'} {surname || ''}</Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            background: 'rgba(255, 215, 0, 0.1)',
            borderRadius: '12px',
            padding: '4px 8px',
            border: '1px solid rgba(255, 215, 0, 0.3)'
          }}>
            {renderStars()}
            <Typography 
              variant="caption" 
              sx={{ 
                ml: 0.5, 
                fontWeight: 'bold', 
                color: '#FF8C00',
                fontSize: '0.75rem'
              }}
            >
              {safeRating}/5
            </Typography>
          </Box>
        </Box>

        {/* Category and gender info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, mb: 0.5 }}>
            <CategoryIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">{category || 'N/A'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {gender || 'N/A'}
            </Typography>
          </Box>
        </Box>

        {/* Car details - ONLY for category ID 5 */}
        {showCarDetails && carId && (
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
                {carBrand || 'N/A'} {carModel || 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <BadgeIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {licensePlate || 'N/A'}
              </Typography>
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
            <Typography variant="body2" color="text.secondary">{address || 'N/A'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationCityIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">{city || 'N/A'}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="h6" color="warning.main" sx={{ mb: 2 }}>{formatPrice(price)}</Typography>
        <Button
          variant="contained"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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