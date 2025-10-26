using Domains;
using Domains.Views;
namespace DataAccessLayer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;



public partial class ShipingContext : IdentityDbContext<applicationUser>
{
  
    private string _sqlConnectionString =  """
                                      
                 Server=DESKTOP-SE7VLTJ\SQLEXPRESS;
                                      
                 Database=Shipping;
                                      
                 Trusted_Connection=True;
                                      
                 TrustServerCertificate=True
                                      
                 """;
    public ShipingContext()
    {
    }

    public ShipingContext(DbContextOptions<ShipingContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TbCarrier> TbCarriers { get; set; }

    public virtual DbSet<TbCity> TbCities { get; set; }

    public virtual DbSet<TbCountry> TbCountries { get; set; }

    public virtual DbSet<TbPaymentMethod> TbPaymentMethods { get; set; }

    public virtual DbSet<TbSetting> TbSettings { get; set; }

    public virtual DbSet<TbShippingType> TbShippingTypes { get; set; }

    public virtual DbSet<TbShippment> TbShippments { get; set; }

    public virtual DbSet<TbStatusShipment> TbStatusShipments { get; set; }

    public virtual DbSet<TbSubscriptionPackage> TbSubscriptionPackages { get; set; }

    public virtual DbSet<TbUserReceiver> TbUserReceivers { get; set; }

    public virtual DbSet<TbUserSebder> TbUserSebders { get; set; }
    public virtual DbSet<TbRefreshToken> TbRefreshToken { get; set; }

    public virtual DbSet<VwShipmentSummary> VwShippmentsSummaries { get; set; }

    public virtual DbSet<TbUserSubscription> TbUserSubscriptions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.
        UseSqlServer(_sqlConnectionString);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);


        modelBuilder.Entity<TbCarrier>(entity =>
        {
            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CarrierName).HasMaxLength(200);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<TbCity>(entity =>
        {
            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CityAname)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("CityAName");
            entity.Property(e => e.CityEname)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("CityEName");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Country).WithMany(p => p.TbCities)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TbCities_TbCountries");
        });

        modelBuilder.Entity<TbCountry>(entity =>
        {
            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CountryAname)
                .HasMaxLength(200)
                .HasColumnName("CountryAName");
            entity.Property(e => e.CountryEname)
                .HasMaxLength(200)
                .HasColumnName("CountryEName");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<TbPaymentMethod>(entity =>
        {
            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.MethdAname)
                .HasMaxLength(200)
                .HasColumnName("MethdAName");
            entity.Property(e => e.MethodEname)
                .HasMaxLength(200)
                .HasColumnName("MethodEName");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<TbSetting>(entity =>
        {
            entity.ToTable("TbSetting");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            // Seed data for shipping rates
            entity.HasData(
                new TbSetting 
                { 
                    Id = Guid.Parse("11111111-1111-1111-1111-111111111111"), 
                    KiloMeterRate = 0.50, 
                    KilooGramRate = 2.00,
                    CreatedDate = new DateTime(2025, 1, 1),
                    UpdatedDate = null
                }
            );
        });

        modelBuilder.Entity<TbShippingType>(entity =>
        {
            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ShippingTypeAname)
                .HasMaxLength(200)
                .HasColumnName("ShippingTypeAName");
            entity.Property(e => e.ShippingTypeEname)
                .HasMaxLength(200)
                .HasColumnName("ShippingTypeEName");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<TbShippment>(entity =>
        {
            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            
          
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.PaymentMethod).WithMany(p => p.TbShippments)
                .HasForeignKey(d => d.PaymentMethodId)
                .HasConstraintName("FK_TbShippments_TbPaymentMethods");

            entity.HasOne(d => d.Receiver).WithMany(p => p.TbShippments)
                .HasForeignKey(d => d.ReceiverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TbShippments_TbUserReceivers");

            entity.HasOne(d => d.Sender).WithMany(p => p.TbShippments)
                .HasForeignKey(d => d.SenderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TbShippments_TbUserSebders");

            entity.HasOne(d => d.ShippingType).WithMany(p => p.TbShippments)
                .HasForeignKey(d => d.ShippingTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TbShippments_TbShippingTypes");

            entity.HasOne(d => d.StatusShipment).WithMany(p => p.TbShippments)
                .HasForeignKey(d => d.StatusShipmentId)
                .HasConstraintName("FK_TbShippments_TbStatusShipments");
        });

        modelBuilder.Entity<TbStatusShipment>(entity =>
        {
            entity.Property(e => e.Id).HasColumnType("tinyint");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);

            // Seed data
            entity.HasData(
                new TbStatusShipment { Id = 1, Name = "Ongoing" },
                new TbStatusShipment { Id = 2, Name = "Completed" },
                new TbStatusShipment { Id = 3, Name = "Cancelled" },
                new TbStatusShipment { Id = 4, Name = "Returned" }
            );
        });

        modelBuilder.Entity<TbSubscriptionPackage>(entity =>
        {
            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.PackageName).HasMaxLength(200);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            // Seed data for subscription packages
            entity.HasData(
                new TbSubscriptionPackage
                {
                    Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    PackageName = "Basic",
                    ShippimentCount = 10,
                    NumberOfKiloMeters = 100.0,
                    TotalWeight = 50.0,
                    CreatedDate = new DateTime(2024, 1, 1),
                    UpdatedDate = null
                },
                new TbSubscriptionPackage
                {
                    Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                    PackageName = "Pro",
                    ShippimentCount = 50,
                    NumberOfKiloMeters = 500.0,
                    TotalWeight = 250.0,
                    CreatedDate = new DateTime(2024, 1, 1),
                    UpdatedDate = null
                },
                new TbSubscriptionPackage
                {
                    Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                    PackageName = "Enterprise",
                    ShippimentCount = 200,
                    NumberOfKiloMeters = 2000.0,
                    TotalWeight = 1000.0,
                    CreatedDate = new DateTime(2024, 1, 1),
                    UpdatedDate = null
                }
            );
        });

        modelBuilder.Entity<TbUserReceiver>(entity =>
        {
            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.Phone).HasMaxLength(200);
            entity.Property(e => e.ReceiverName).HasMaxLength(200);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.City).WithMany(p => p.TbUserReceivers)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TbUserReceivers_TbCities");
        });

        modelBuilder.Entity<TbUserSebder>(entity =>
        {
            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.Phone).HasMaxLength(200);
            entity.Property(e => e.SenderName).HasMaxLength(200);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.City).WithMany(p => p.TbUserSebders)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TbUserSebders_TbCities");
        });

        modelBuilder.Entity<TbUserSubscription>(entity =>
        {
            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.SubscriptionDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Package).WithMany(p => p.TbUserSubscriptions)
                .HasForeignKey(d => d.PackageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TbUserSubscriptions_TbSubscriptionPackages");
        });

        modelBuilder.Entity<TbRefreshToken>(entity =>
        {
            entity.ToTable("TbRefreshToken");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.UserId)
                .IsRequired()
                .HasMaxLength(450);
            entity.Property(e => e.Token)
                .IsRequired()
                .HasMaxLength(500);
            entity.Property(e => e.Expires).HasColumnType("datetime2");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            // Index for performance on token lookups
            entity.HasIndex(e => e.Token).IsUnique();
            entity.HasIndex(e => e.UserId);
        });

        modelBuilder.Entity<VwShipmentSummary>().HasNoKey().ToView("VwShippmentsSummary"); 

        // Configure ApplicationUser relationship with TbSubscriptionPackage
        modelBuilder.Entity<applicationUser>(entity =>
        {
            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.LastName).HasMaxLength(100);
            entity.Property(e => e.Phone).HasMaxLength(20);

        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
