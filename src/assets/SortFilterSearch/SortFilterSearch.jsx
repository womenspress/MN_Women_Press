import React, { useState } from 'react';

// components
import { Box, TextField, Button, Menu, MenuItem, IconButton, ButtonGroup } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ReplayIcon from '@mui/icons-material/Replay';
import SearchIcon from '@mui/icons-material/Search';

export default function SortFilterSearch(props) {

  /* 
  props: 
  sortOptions = string[], eg ['alphabetical', 'date', etc.]
  sortMethod:
  setSortMethod
  sortDirection
  setSortDirection
  
  searchByOptions = string[], eg  ['']
  searchTerm: a useState variable from parent component
  setSearchTerm: useState function from parent component
  searchBy:
  setSearchBy
  */

  const {
    sortOptions,
    sortMethod,
    setSortMethod,
    sortDirection,
    setSortDirection,
    searchTerm,
    setSearchTerm,
    searchByOptions,
    searchBy,
    setSearchBy
  } = props

  const [searchByAnchor, setSearchByAnchor] = useState(null);
  const searchByOpen = Boolean(searchByAnchor)

  const [sortAnchor, setSortAnchor] = useState(null);
  const sortOpen = Boolean(sortAnchor)


  const handleReset = () => {
    setSortMethod(sortOptions[0]);
    setSearchBy(searchByOptions[0]);
    setSortDirection('ascending');
    setSearchTerm('');
  }


  const openSearchByMenu = (e) => {
    setSearchByAnchor(e.currentTarget)
  }

  const openSortMenu = (e) => {
    setSortAnchor(e.currentTarget);
  }

  const toggleSortDirection = () => {
    if (sortDirection === 'ascending') setSortDirection('descending')
    if (sortDirection === 'descending') setSortDirection('ascending')
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center',}}>
      <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
        <Button
          size='small'
          onClick={handleReset}
        >
          <ReplayIcon sx={{ height: 20, width: 20 }} />
        </Button>
        
        <ButtonGroup>{/*1 On click invoke openSortMenu */}
          <Button
            onClick={openSortMenu}
            sx={{ textTransform: 'none' }}
            variant='text'
            size='small'
          >{sortMethod}
          </Button>

          <Button
            onClick={toggleSortDirection}
            variant='text'
            sx={{ paddingLeft: 0 }}
            size='small'
          >
            {sortDirection === 'ascending' && <ArrowDropDownIcon />}
            {sortDirection === 'descending' && <ArrowDropUpIcon />}
          </Button>
        </ButtonGroup>


        <Button
          endIcon={<SearchIcon />}
          onClick={openSearchByMenu}
          sx={{ textTransform: 'none' }}
          size='small'
        >{searchBy}</Button>
      </Box>
      <Menu
        anchorEl={sortAnchor}
        open={sortOpen}
        onClose={() => setSortAnchor(null)}
      >
        {sortOptions.map(option => {
          return (
            <MenuItem
              key={option}
              onClick={() => setSortMethod(option)}
            >
              {option}
            </MenuItem>
          )
        })}
      </Menu>

      <Menu
        anchorEl={searchByAnchor}
        open={searchByOpen}
        onClose={() => setSearchByAnchor(null)}
      >
        {searchByOptions?.map(option => {
          return (
            <MenuItem
              key={option}
              onClick={() => setSearchBy(option)}
            >
              {option}
            </MenuItem>
          )
        })}
      </Menu>
      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size='small'
        placeholder='search'
      />

    </Box>
  )
}
