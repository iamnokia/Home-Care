import { Box, Typography, Container, Paper, Grid, Avatar, IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const HistoryService = () => {
  // Sample data - replace with your actual data or API call
  const [serviceHistory, setServiceHistory] = useState([
    {
      id: 1,
      date: "ເວລາທີ່ເຂົ້າ: 8:00AM",
      provider: "Phongvilay",
      age: "ອາຍຸ: 22 ປີ",
      location: "ບ້ານ ຫາດຊາຍ, ເມືອງ ນາຊາຍທອງ,",
      serviceType: "Cleaner",
      price: "ລາຄາ 200000 ກີບ",
      avatar: "https://via.placeholder.com/60"
    },
    {
      id: 2,
      date: "ເວລາທີ່ເຂົ້າ: 8:00AM",
      provider: "Phongvilay",
      age: "ອາຍຸ: 21 ປີ",
      location: "ບ້ານ ຫາດຊາຍ, ເມືອງ ນາຊາຍທອງ,",
      serviceType: "Electrician",
      price: "ລາຄາ 100000 ກີບ",
      avatar: "https://via.placeholder.com/60"
    },
    {
      id: 3,
      date: "ເວລາທີ່ເຂົ້າ: 8:00AM",
      provider: "Ammalin",
      age: "ອາຍຸ: 24 ປີ",
      location: "ບ້ານ ຮ່ອງຄວາຍ, ເມືອງ ສີໂຄດຕະບອງ,",
      serviceType: "AC Technician",
      price: "ລາຄາ 150000 ກີບ",
      avatar: "https://via.placeholder.com/60"
    },
    {
      id: 4,
      date: "ເວລາທີ່ເຂົ້າ: 8:00AM",
      provider: "Ammalin",
      age: "ອາຍຸ: 30 ປີ",
      location: "ບ້ານ ຮ່ອງຄວາຍ, ເມືອງ ສີໂຄດຕະບອງ,",
      serviceType: "Plumber",
      price: "ລາຄາ 200000 ກີບ",
      avatar: "https://via.placeholder.com/60"
    },
    {
      id: 5,
      date: "ເວລາທີ່ເຂົ້າ: 8:00AM",
      provider: "Phouvongxay",
      age: "ອາຍຸ: 35 ປີ",
      location: "ບ້ານ ປາກງື່ມ, ເມືອງ ໄຊທານີ,",
      serviceType: "Transportation",
      price: "ລາຄາ 300000 ກີບ",
      avatar: "https://via.placeholder.com/60"
    }
  ]);

  // Function to handle deletion of a history item
  const handleDelete = (id) => {
    // Filter out the item with the matching id
    const updatedHistory = serviceHistory.filter(item => item.id !== id);
    setServiceHistory(updatedHistory);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          textAlign="center" 
          sx={{ 
            mb: 4, 
            color: "white",
            fontWeight: "bold"
          }}
        >
          ປະຫວັດການບໍລິການ
        </Typography>

        {serviceHistory.length > 0 ? (
          serviceHistory.map((service) => (
            <Paper 
              key={service.id}
              elevation={1} 
              sx={{ 
                mb: 2, 
                p: 2, 
                borderRadius: 2,
                position: "relative"
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    {service.date}
                  </Typography>
                </Grid>
                <Grid item xs={2} sm={1}>
                  <Avatar 
                    src={service.avatar} 
                    alt={service.provider}
                    sx={{ width: 60, height: 60 }}
                  />
                </Grid>
                <Grid item xs={7} sm={8}>
                  <Typography variant="h6" component="div">
                    {service.provider}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.age}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.location}
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={3} textAlign="right">
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {service.serviceType}
                  </Typography>
                  <Typography variant="body2" color="primary.light">
                    {service.price}
                  </Typography>
                </Grid>
                <Box 
                  sx={{ 
                    position: "absolute", 
                    top: 8, 
                    right: 8 
                  }}
                >
                  <IconButton 
                    aria-label="delete" 
                    color="error"
                    onClick={() => handleDelete(service.id)}
                    sx={{
                      '&:hover': {
                        bgcolor: "rgba(244, 67, 54, 0.1)",
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Paper>
          ))
        ) : (
          <Paper 
            elevation={1} 
            sx={{ 
              p: 4, 
              borderRadius: 2, 
              textAlign: "center" 
            }}
          >
            <Typography variant="h6" color="text.secondary">
              ບໍ່ມີປະຫວັດການບໍລິການ
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default HistoryService;