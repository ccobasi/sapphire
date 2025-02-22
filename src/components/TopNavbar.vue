
<script setup>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap';

  import { authStore } from "../store/store";


  const store = authStore();

</script>
<template>
  <div class="navbar">
    <div class="mobile-menu">
      <iconify-icon icon="mdi:menu" width="36" height="36" @click="store.showSidebar=true" class="menu-icon"></iconify-icon>
      <div class="mini-menu-options">
      
          <div class="profile">
            <span>Admin HR</span>
           
            <div class="profile-image">
              <img src="https://s3-alpha-sig.figma.com/img/b70c/c312/7a6dcf244827d0da75069e7993508735?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oRdVWfUdvHPS4UDO9xUEXmYLjy8zZrNF2j7KEvvfGWFTPRWNDGU10X8J7ZD-r0mj5i76o8uvZdWED2r~d5XLmYybT9UXKJ47gFO3i8Z62uMDSO7YLtwHjfu06IikYq3X1Hj8iL7uY51fPeRIiBqIhQ1Q2OPnzBr42hI6ifNSGFY78dwSXbdzsV8xlm6ajW~D95rZijSCGPTsvhfT2Uv~-WQ1f0c4WwjkTTvJ9Ko9aNeRKQU6Mdrr8WwkzEtfJG1bxO4wFRZvTHWfKjr1TS~gZs6gksfIoK3h2H0RA5Mi9ZCZkYq9beZYSQKEiJGeiXf92MDiKx60HHPaVI2as2G~yg__" alt="" />
              <div class="notification-status"></div>
            </div>
           
          </div>
          
      </div>
    </div>
      <div class="breadcrumb">
        <li>Dashboard</li>
        <iconify-icon icon="ri:arrow-right-s-line" width="24" height="24" class="divider-icon"></iconify-icon>
        <li class="active">Home</li>
      </div>
      <div class="search-area">
        <input type="text" class="form-control" placeholder="Search..." />
        <iconify-icon icon="ri:search-line" width="24" height="24"></iconify-icon>
      </div>
      <div class="options">
        <div class="global-button">
          <select name="" id="" class="form-control">
            <option value="">Global</option>
          </select>
          
        </div>
        <div class="profile">
          <div class="profile-image">
            <img src="https://s3-alpha-sig.figma.com/img/b70c/c312/7a6dcf244827d0da75069e7993508735?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oRdVWfUdvHPS4UDO9xUEXmYLjy8zZrNF2j7KEvvfGWFTPRWNDGU10X8J7ZD-r0mj5i76o8uvZdWED2r~d5XLmYybT9UXKJ47gFO3i8Z62uMDSO7YLtwHjfu06IikYq3X1Hj8iL7uY51fPeRIiBqIhQ1Q2OPnzBr42hI6ifNSGFY78dwSXbdzsV8xlm6ajW~D95rZijSCGPTsvhfT2Uv~-WQ1f0c4WwjkTTvJ9Ko9aNeRKQU6Mdrr8WwkzEtfJG1bxO4wFRZvTHWfKjr1TS~gZs6gksfIoK3h2H0RA5Mi9ZCZkYq9beZYSQKEiJGeiXf92MDiKx60HHPaVI2as2G~yg__" alt="" />
          </div>
          <span>Admin HR</span>
          <iconify-icon icon="iconamoon:arrow-down-2" width="24" height="24"></iconify-icon>
        </div>
        <div class="notifications">
          <div class="notification-icon">
            <iconify-icon icon="material-symbols:notifications-unread-outline" width="24" height="24"></iconify-icon>
          </div>
          <div class="notification-status"></div>
        </div>
      </div>
      
  </div>
</template>


<style lang="scss" scoped>

.navbar{
  display: flex;
  justify-content: space-between;
}

.mobile-menu{
  display:flex;
    justify-content: space-between;
    flex-direction: row;
    width:100% !important;


    .mini-menu-options .profile{
      display:flex;
      align-items:center;
      gap:10px;

      .profile-image{
        position: relative;
      }

      .notification-status{
        width:15px;
        height:15px;
        border:2px solid var(--background);
        background-color: #F44336;
        border-radius:50%;
        position: absolute;
        top: -3px;
        right: -3px;

      }
    }
  .menu-icon{
    color:var(--dark);
    
  }
}


.breadcrumb{
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  li{
    opacity: .4;
    font-weight: 600;
    color:var(--dark);

    &.active{
      opacity: 1;
    }
  }

  .divider-icon{
    opacity: .4;
    color:var(--dark);
  }
}

.search-area{
  position: relative;
  margin-left: 10px;
  width:100%;
  max-width:25rem;

  input{
    border-radius: 5px;
    padding: .5rem 1.5rem;
    background:var(--grey);
    border:none;color:var(--dark);
    

    &::placeholder{
      opacity: .4;
      color:var(--dark);
    }
  }

  iconify-icon{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    color: #ccc;
  }
}





.profile, .mini-menu-options .profile{
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  .profile-image{
    width:40px;
    height:40px;

    img{
      border-radius: 50%;
      width:100%;
      height: 100%;
      object-fit: cover;
    }
  }

  span{
    font-size: 14px;
    color: var(--dark);
  }
}

.options{
  display: flex;
  align-items: center;
  gap: 10px;

  select{
    background: transparent;
    padding: .5rem;
    font-size: 14px;
    color: var(--dark);
    border:1px solid var(--dark);
    border-radius: 5px;

  }


  

}

.mobile-menu{
  display:none;
  
  
}


@media screen and (max-width:1024px) {

  .mobile-menu{
    display:flex;
 
  }
  .navbar{
    flex-direction:column;
    align-items:flex-start;

    .search-area{
      margin-top:10px;
      max-width: none;
      margin-left:0;
    }

    .breadcrumb{
      margin-top: 10px;
    }
  }
  .options{
    display: none;
  }
}

</style>