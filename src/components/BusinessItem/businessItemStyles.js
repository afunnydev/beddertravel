const businessItemStyles = () => ({
  card: {
    marginBottom: 15,
    backgroundColor: 'white',
    display: 'block',
  },
  media: {
    height: 0,
    borderRadius: 4,
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    padding: '10px 15px',
    '&:last-child': {
      paddingBottom: '10px',
    },
  },
  locationText: {
    fontSize: 12,
    marginTop: 7,
  },
  iconLocation: {
    fontSize: 18,
    marginTop: -1.5,
    marginLeft: -4,
  },
  ratingButton: {
    minWidth: 'auto',
    marginTop: 7,
    fontSize: 18,
    padding: '5px 10px',
  },
  reviewsText: {
    fontSize: 10,
    marginTop: 5,
  },
  priceText: {
    marginTop: 20,
    fontWeight: 'bold',
    '& span': {
      color: '#000',
      fontWeight: 'normal',
      marginLeft: 5,
    }
  },
  businessName: {
    fontSize: 24,
    lineHeight: '28px',
  },
});

export default businessItemStyles;