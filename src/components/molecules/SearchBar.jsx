import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const SearchBar = ({ onSearch, placeholder = "Search products..." }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          icon="Search"
          iconPosition="left"
          className="bg-white shadow-sm"
        />
      </div>
      
      <Button 
        type="submit" 
        variant="primary"
        icon="Search"
        className="px-6"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;